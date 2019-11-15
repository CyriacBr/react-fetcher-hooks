import React, {
  useEffect,
  useRef,
  useState,
  ReactNode,
  MutableRefObject,
  useContext
} from "react";
import { PlaceholderOptions } from "./Fetcher";
import { FetcherRef } from "../fetcherRef";
import { useFetcherStatus, adjustParentPosition } from "..";
import { useFetcherCallbacks } from "../hooks";
import { RefsContext } from "../contexts/refsContext";

export interface PlaceholderProps {
  options: PlaceholderOptions;
  initialLoading: boolean;
}

function createBlock(
  left: number,
  top: number,
  width: number,
  height: number,
  options: PlaceholderOptions
) {
  const style: React.CSSProperties = {
    position: "absolute",
    left: `${left}px`,
    top: `${top}px`,
    width,
    height,
    backgroundColor: options.color,
    backgroundImage: `linear-gradient(
      90deg,
      ${options.color},
      ${options.highlightColor},
      ${options.color}
    )`,
    backgroundSize: "200px 100%",
    backgroundRepeat: "no-repeat",
    borderRadius: "4px",
    display: "inline-block",
    animation: `placeholder-anim 1.2s ease-in-out infinite`
  };
  return <div style={style}></div>;
}

function getInnerRect(el: HTMLElement) {
  const style = getComputedStyle(el);
  const rect = el.getBoundingClientRect();
  const spacing = {
    top: parseFloat(style.marginTop) + parseFloat(style.paddingTop),
    left: parseFloat(style.marginLeft) +  parseFloat(style.paddingLeft),
    right: parseFloat(style.marginRight) + parseFloat(style.paddingRight),
    bottom: parseFloat(style.marginBottom) + parseFloat(style.paddingBottom),
  };
  // return {
  //   top: rect.top + spacing.top,
  //   left: rect.left + spacing.left,
  //   width: rect.width - spacing.right - spacing.left,
  //   height: rect.height - spacing.top - spacing.bottom
  // };
  /**
   * offsetTop and offsetLeft already include the margin
   * offsetWidth and offsetHeight already include the padding
   */
  return {
    top: el.offsetTop + parseFloat(style.paddingTop),
    left: el.offsetLeft + parseFloat(style.paddingLeft),
    width: el.offsetWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight),
    height: el.offsetHeight - parseFloat(style.marginBottom) - parseFloat(style.marginTop)
  };
}

function createElements(
  wrapperRef: MutableRefObject<HTMLDivElement>,
  options: PlaceholderOptions
) {
  const wrapperEl = wrapperRef.current;
  if (!wrapperEl) return [];
  const parent = wrapperEl.parentElement;
  wrapperEl.style.backgroundColor = getComputedStyle(parent).backgroundColor;

  const targets = parent.querySelectorAll(`.${options.classTarget}`);
  const newElements: ReactNode[] = [];
  const parentPos = {
    top: parent.offsetTop,
    left: parent.offsetLeft
  };
  console.log('targets :', targets);
  for (const target of Array.from(targets)) {
    const el = target as HTMLElement;
    const text = el.innerText;
    const rect = getInnerRect(el);
    const nbrLines =
      Math.floor(rect.height / parseInt(getComputedStyle(el).lineHeight));
    const childPos = {
      top: el.offsetTop,
      left: el.offsetLeft
    };
    const offset = {
      top: childPos.top - 0, //parentPos.top,
      left: childPos.left - 0 //parentPos.left
    };
    const space = 6;
    console.log('nbrLines :', nbrLines);
    console.log('el :', el);
    console.log('el.clientHeight :', el.clientHeight);
    console.log('rect :', rect);
    console.log('el.getBoundingClientRect :', el.getBoundingClientRect());
    console.log('childPos :', childPos);
    if (!text || nbrLines === 1) {
      const height = rect.height;// - space;
      const y = rect.top;// + rect.height / 2 - height / 2;
      newElements.push(
        createBlock(rect.left, y, rect.width, height, options)
      );
    } else {
      const lineHeight = (rect.height - space * nbrLines) / nbrLines;
      for (let i = 0; i < nbrLines; i++) {
        const parts = 2;
        const xSpace = 12;
        const chunk = (Math.random() * (70 - 30) + 30) * 0.01 * rect.width;
        const y = rect.top + lineHeight * i + space * i;
        if (
          options.divide &&
          (options.truncateLastLine ? i !== nbrLines - 1 : true)
        ) {
          for (let j = 0; j < parts; j++) {
            const x = rect.left + j * (chunk + xSpace);
            const width = Math.abs(chunk - rect.width * j - xSpace * j);
            newElements.push(createBlock(x, y, width, lineHeight, options));
          }
          continue;
        }
        const width =
          options.truncateLastLine && i === nbrLines - 1
            ? rect.width * 0.4 + rect.width * Math.random() * 0.4
            : rect.width;
        newElements.push(
          createBlock(rect.left, y, width, lineHeight, options)
        );
      }
    }
  }
  console.log('newElements :', newElements);
  return newElements;
}

export const Placeholder: React.FC<PlaceholderProps> = ({
  children,
  options,
  initialLoading
}) => {
  const refs = useContext(RefsContext);
  const [elements, setElements] = useState<ReactNode[]>([]);
  const wrapperRef = useRef<HTMLDivElement>();
  const { loading } = useFetcherStatus(refs, initialLoading);
  const { wrapperClassCSS, wrapperStyles } = options;

  useEffect(() => {
    setElements(loading ? createElements(wrapperRef, options) : []);
  }, [loading]);

  useEffect(() => {
    if (!wrapperRef) return;
    adjustParentPosition(wrapperRef.current);
  });

  return (
    <>
      {loading && (
        <div
          className={wrapperClassCSS}
          style={wrapperStyles || {}}
          ref={wrapperRef}
        >
          {elements.map(e => e)}
        </div>
      )}
      {children}
    </>
  );
};
