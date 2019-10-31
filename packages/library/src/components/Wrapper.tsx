import React, {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useContext
} from "react";
import { FetcherOptions } from "./Fetcher";
import { adjustParentPosition, adjustBorderRadius, useProgress } from "..";
import { ClipLoader } from "react-spinners";
import { FetcherRef } from "../fetcherRef";
import { LoadingDisplay } from "./LoadingDisplay";
import { ErrorDisplay } from "./ErrorDisplay";
import { useFetcherStatus } from "../hooks/useFetcherStatus";
import { useFetcherCallback } from "../hooks";
import Progress from "./Progress";
import { RefsContext } from "../contexts/refsContext";

export interface WrapperProps {
  options: FetcherOptions;
}

const Wrapper: React.FC<WrapperProps> = ({ options, children }) => {
  const refs = useContext(RefsContext);
  const { error, loading } = useFetcherStatus(refs, options.initialLoading);
  const containerElement = useRef(null);
  const progress = useProgress({
    tickDelay: options.progress.tickDelay,
    valuePerTick: options.progress.valuePerTick
  });
  const progressColor = error
    ? options.progress.errorColor
    : options.progress.color;

  const {
    wrapperStyles,
    wrapperClassCSS,
    dimBackground,
    wrapperBackgroundColor
  } = options;
  const finalWrapperStyles = {
    ...(wrapperStyles || {}),
    background: dimBackground ? wrapperBackgroundColor : "#ffffff00"
  };

  useEffect(() => {
    if (!containerElement) return;
    adjustParentPosition(containerElement.current);
    if (options.adjustBorderRadius)
      adjustBorderRadius(containerElement.current);
  });

  useFetcherCallback(
    {
      start: onFetchStart,
      end: onFetchEnd
    },
    refs,
    [progress]
  );

  function onFetchStart() {
    progress.start();
  }

  function onFetchEnd() {
    progress.done();
  }

  return (
    <>
      {((options.handleLoading && loading) ||
        (options.handleError && error) ||
        (options.handleLoading && options.progress.show && progress.show)) && (
        <div
          className={wrapperClassCSS}
          ref={containerElement}
          style={finalWrapperStyles}
        >
          {options.progress.show && (
            <Progress ref={progress.ref} color={progressColor} />
          )}
          <LoadingDisplay loading={loading} refs={refs} options={options} />
          <ErrorDisplay error={error} refs={refs} options={options} />
        </div>
      )}
    </>
  );
};

export { Wrapper };
