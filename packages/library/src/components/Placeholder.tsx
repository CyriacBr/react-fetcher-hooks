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
import { useFetcherStatus } from "..";
import { useFetcherCallback } from "../hooks";
import { RefsContext } from "../contexts/refsContext";

export interface PlaceholderProps {
  options: PlaceholderOptions;
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
  for (const target of Array.from(targets)) {
    const el = target as HTMLElement;
    const text = el.innerText;
    const nbrLines =
      el.clientHeight / parseInt(getComputedStyle(el).lineHeight);
    const childPos = {
      top: el.offsetTop,
      left: el.offsetLeft
    };
    const offset = {
      top: childPos.top - 0, //parentPos.top,
      left: childPos.left - 0 //parentPos.left
    };
    const space = 6;
    if (!text || nbrLines === 1) {
      const height = el.clientHeight - space;
      const y = offset.top + el.clientHeight / 2 - height / 2;
      newElements.push(
        createBlock(offset.left, y, el.clientWidth, height, options)
      );
    } else {
      const lineHeight = (el.clientHeight - space * nbrLines) / nbrLines;
      for (let i = 0; i < nbrLines; i++) {
        const parts = 2;
        const xSpace = 12;
        const chunk = (Math.random() * (70 - 30) + 30) * 0.01 * el.clientWidth;
        const y = offset.top + lineHeight * i + space * i;
        if (
          options.divide &&
          (options.truncateLastLine ? i !== nbrLines - 1 : true)
        ) {
          for (let j = 0; j < parts; j++) {
            const x = offset.left + j * (chunk + xSpace);
            const width = Math.abs(chunk - el.clientWidth * j - xSpace * j);
            newElements.push(createBlock(x, y, width, lineHeight, options));
          }
          continue;
        }
        const width =
          options.truncateLastLine && i === nbrLines - 1
            ? el.clientWidth * 0.4 + el.clientWidth * Math.random() * 0.4
            : el.clientWidth;
        newElements.push(
          createBlock(offset.left, y, width, lineHeight, options)
        );
      }
    }
  }
  return newElements;
}

export const Placeholder: React.FC<PlaceholderProps> = ({
  children,
  options
}) => {
  const refs = useContext(RefsContext);
  const [elements, setElements] = useState<ReactNode[]>([]);
  const wrapperRef = useRef<HTMLDivElement>();
  const { loading } = useFetcherStatus(refs);
  const { wrapperClassCSS, wrapperStyles } = options;

  useEffect(() => {
    setElements(loading ? createElements(wrapperRef, options) : []);
  }, [loading]);

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
