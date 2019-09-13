import React, { useEffect, useRef, useState, ReactNode } from 'react';

export interface PlaceholderOptions {
  classTarget?: string;
  wrapperClassCSS?: string;
  wrapperStyles?: React.CSSProperties;
  color?: string;
  highlightColor?: string;
  divide?: boolean;
  truncateLastLine?: boolean;
}

export interface PlaceholderProps {
  options: PlaceholderOptions;
}

function createBloc(
  left: number,
  top: number,
  width: number,
  height: number,
  options: PlaceholderOptions
) {
  const style: React.CSSProperties = {
    position: 'absolute',
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
    backgroundSize: '200px 100%',
    backgroundRepeat: 'no-repeat',
    borderRadius: '4px',
    display: 'inline-block',
    animation: `placeholder-anim 1.2s ease-in-out infinite`
  };
  return <div style={style}></div>;
}

export const Placeholder: React.FC<PlaceholderProps> = ({ children, options }) => {
  const [elements, setElements] = useState<ReactNode[]>([]);
  const wrapperRef = useRef();

  useEffect(() => {
    const wrapperEl = wrapperRef.current as HTMLDivElement;
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
      const nbrLines = el.clientHeight / parseInt(getComputedStyle(el).lineHeight);
      const childPos = {
        top: el.offsetTop,
        left: el.offsetLeft
      };
      const offset = {
        top: childPos.top - parentPos.top,
        left: childPos.left - parentPos.left
      };
      if (!text || nbrLines === 1) {
        newElements.push(
          createBloc(offset.left, offset.top, el.clientWidth, el.clientHeight, options)
        );
      } else {
        const space = 6;
        const lineHeight = (el.clientHeight - space * nbrLines) / nbrLines;
        for (let i = 0; i < nbrLines; i++) {
          const parts = 2;
          const xSpace = 12;
          const chunk = (Math.random() * (70 - 30) + 30) * 0.01 * el.clientWidth;
          const y = offset.top + lineHeight * i + space * i;
          if (options.divide && (options.truncateLastLine ? i !== nbrLines - 1 : true)) {
            for (let j = 0; j < parts; j++) {
              const x = offset.left + j * (chunk + xSpace);
              const width = Math.abs(chunk - el.clientWidth * j - xSpace * j);
              newElements.push(createBloc(x, y, width, lineHeight, options));
            }
            continue;
          }
          const width =
            options.truncateLastLine && i === nbrLines - 1
              ? el.clientWidth * 0.4 + el.clientWidth * Math.random() * 0.4
              : el.clientWidth;
          newElements.push(createBloc(offset.left, y, width, lineHeight, options));
        }
      }
    }
    setElements(newElements);
  }, [options, children]);

  return (
    <>
      <div className="placeholder-wrapper" ref={wrapperRef}>
        {elements.map(e => e)}
      </div>
      {children}
    </>
  );
};
