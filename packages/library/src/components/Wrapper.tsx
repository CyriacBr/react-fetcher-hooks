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
import { useFetcherCallbacks } from "../hooks";
import Progress from "./Progress";
import { RefsContext } from "../contexts/refsContext";
import ProgressDisplay from "./ProgressDisplay";

export interface WrapperProps {
  options: FetcherOptions;
}

const Wrapper: React.FC<WrapperProps> = ({ options }) => {
  const refs = useContext(RefsContext);
  const { error, loading } = useFetcherStatus(refs, options.initialLoading);
  const containerElement = useRef(null);

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

  return (
    <>
      {options.progress.show && options.handleLoading && (
        <ProgressDisplay
          error={error}
          loading={loading}
          options={options}
          refs={refs}
        />
      )}
      {((options.handleLoading && loading) ||
        (options.handleError && error)) && (
        <div
          className={wrapperClassCSS}
          ref={containerElement}
          style={finalWrapperStyles}
        >
          {options.handleLoading && !error && (
            <LoadingDisplay loading={loading} refs={refs} options={options} />
          )}
          {options.handleError && (
            <ErrorDisplay error={error} refs={refs} options={options} />
          )}
        </div>
      )}
    </>
  );
};

export { Wrapper };
