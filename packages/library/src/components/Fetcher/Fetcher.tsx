import React, { useState, useRef, useEffect, useCallback } from 'react';
import { FetcherAPI, FetcherError } from './useFetcher';
import { ClipLoader } from 'react-spinners';
import Progress from '../Progress/Progress';
import { useProgress } from '../Progress/useProgress';
import { Placeholder } from '../Placeholder/Placeholder';

export interface FetcherProps {
  fetcher: FetcherAPI;
}

const adjustParentPosition = (element: HTMLElement) => {
  if (!element) return;
  let parent = element.parentElement as HTMLElement;
  element.style.visibility = 'hidden';
  if (parent) {
    parent.style.position = 'relative';
    element.style.visibility = 'visible';
  } else {
    console.warn(
      `react-use-fetcher cannot set this component's parent element position to 'relative'`
    );
  }
};

const adjustBorderRadius = (element: HTMLElement) => {
  if (!element) return;
  let child = element.children[0] as HTMLElement;
  if (child) {
    element.style.borderRadius = child.style.borderRadius;
  } else {
    console.warn(`react-use-fetcher couldn't adjust the wrapper's border radius`);
  }
};

export const Fetcher: React.FC<FetcherProps> = ({ fetcher, children }) => {
  if (!fetcher) {
    throw new Error('You need to pass a FetcherAPI to the Fetcher component.');
  }
  const { options } = fetcher;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<FetcherError>(null);

  const progress = useProgress({
    tickDelay: options.progress.tickDelay,
    valuePerTick: options.progress.valuePerTick
  });
  let [progressColor, setProgressColor] = useState(options.progress.color);

  const onFetchStart = () => {
    setProgressColor(options.progress.color);
    progress.start();
    setLoading(true);
  };
  const onLoadingForcedStart = () => {
    setProgressColor(options.progress.color);
    progress.start();
    setLoading(true);
  };
  const onAllFetchEnd = () => {
    if (!fetcher.isBusy()) {
      progress.done();
      setLoading(false);
    }
  };
  const onLoadingForcedEnd = () => {
    progress.done();
    setLoading(false);
  };
  const onError = () => {
    setProgressColor(options.progress.errorColor);
    progress.done();
    setError({
      message: options.errorMessage
    });
  };
  const onErrorForced = (error: FetcherError) => {
    setProgressColor(options.progress.errorColor);
    progress.done();
    setError(error);
  };

  useEffect(() => {
    fetcher.addListener('fetch-start', onFetchStart);
    fetcher.addListener('loading-forced-start', onLoadingForcedStart);
    fetcher.addListener('all-fetch-end', onAllFetchEnd);
    fetcher.addListener('loading-forced-end', onLoadingForcedEnd);
    fetcher.addListener('error', onError);
    fetcher.addListener('error-forced', onErrorForced);

    return () => {
      fetcher.removeListener('fetch-start', onFetchStart);
      fetcher.removeListener('loading-forced-start', onLoadingForcedStart);
      fetcher.removeListener('all-fetch-end', onAllFetchEnd);
      fetcher.removeListener('loading-forced-end', onLoadingForcedEnd);
      fetcher.removeListener('error', onError);
      fetcher.removeListener('error-forced', onErrorForced);
    };
  }, [fetcher]);

  const containerElement = useRef(null);
  useEffect(() => {
    adjustParentPosition(containerElement.current);
    if (options.adjustBorderRadius) adjustBorderRadius(containerElement.current);
  });

  const onRetry = useCallback(() => fetcher.retry(), [fetcher]);

  const renderLoading = () => {
    let Loader = options.loaderComponent;
    let {
      loadingStyles,
      wrapperStyles,
      loadingClassCSS,
      wrapperClassCSS,
      dimBackground,
      wrapperBackgroundColor,
      hideLoader
    } = options;
    wrapperStyles = {
      ...(wrapperStyles || {}),
      background: dimBackground ? wrapperBackgroundColor : '#ffffff00'
    };
    return (
      <>
        <div className={wrapperClassCSS} ref={containerElement} style={wrapperStyles}>
          {options.progress.show && progress.show && (
            <Progress value={progress.value} color={progressColor} />
          )}
          <div className={loadingClassCSS} style={loadingStyles || {}}>
            {!hideLoader && (Loader ? (
              <Loader color={options.loadingColor} />
            ) : (
              <ClipLoader color={options.loadingColor} />
            ))}
          </div>
        </div>
        <Placeholder children={children} options={options.placeholder} />
      </>
    );
  };

  const renderError = () => {
    let Button = options.buttonComponent;
    let Error = options.errorComponent;
    let {
      wrapperStyles,
      wrapperClassCSS,
      dimBackground,
      wrapperBackgroundColor,
      errorClassCSS,
      errorStyles
    } = options;
    wrapperStyles = {
      ...(wrapperStyles || {}),
      background: dimBackground ? wrapperBackgroundColor : '#ffffff00'
    };
    return (
      <>
        <div className={wrapperClassCSS} ref={containerElement} style={wrapperStyles}>
          {options.progress.show && progress.show && (
            <Progress value={progress.value} color={progressColor} />
          )}
          {Error ? (
            <Error options={options} doRetry={onRetry} />
          ) : (
            <div className={errorClassCSS} style={errorStyles || {}}>
              <span>{options.errorMessage}</span>
              {fetcher.hasFailedTasks() &&
                (Button ? <Button doRetry={onRetry} /> : <button onClick={onRetry}>Retry</button>)}
            </div>
          )}
        </div>
        {children}
      </>
    );
  };

  const renderNormal = () => {
    return (
      <>
        {options.progress.show && progress.show && (
          <Progress value={progress.value} color={progressColor} />
        )}
        {children}
      </>
    );
  };

  return loading ? renderLoading() : error ? renderError() : renderNormal();
};
