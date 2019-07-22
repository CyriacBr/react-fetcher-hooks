import React, { useState, useRef, useEffect } from 'react';
import { FetcherAPI, FetcherError } from './useFetcher';
import { ClipLoader } from 'react-spinners';
import Progress from '../Progress/Progress';
import { useProgress } from '../Progress/useProgress';

export interface FetcherProps {
  fetcher: FetcherAPI;
}

export const Fetcher: React.FC<FetcherProps> = ({ fetcher, children }) => {
  if (!fetcher) {
    throw new Error('You need to pass a FetcherAPI to the Fetcher component.');
  }
  const { options } = fetcher;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<FetcherError>(null);
  fetcher.useLoading(loading, setLoading);
  fetcher.useError(error, setError);

  const progress = useProgress({
    tickDelay: options.progress.tickDelay,
    valuePerTick: options.progress.valuePerTick
  });
  let [progressColor, setProgressColor] = useState(options.progress.color);
  fetcher.addListener('fetch-start', () => {
    setProgressColor(options.progress.color);
    progress.start();
  });
  fetcher.addListener('loading-forced-start', () => {
    setProgressColor(options.progress.color);
    progress.start();
  });
  fetcher.addListener('fetch-end', () => {
    progress.done();
  });
  fetcher.addListener('loading-forced-end', () => {
    progress.done();
  });
  fetcher.addListener('error', () => {
    setProgressColor(options.progress.errorColor);
    progress.done();
  });
  fetcher.addListener('error-forced', () => {
    setProgressColor(options.progress.errorColor);
    progress.done();
  });

  const containerElement = useRef(null);
  useEffect(() => {
    let el = containerElement.current as HTMLElement;
    if (!el) return;
    let parent = el.parentElement as HTMLElement;
    el.style.visibility = 'hidden';
    if (parent) {
      parent.style.position = 'relative';
      el.style.visibility = 'visible';
    } else {
      console.warn(
        `react-use-fetcher cannot set this component's parent element position to 'relative'`
      );
    }
  });

  const onRetry = () => {
    fetcher.retry();
  };

  const renderLoading = () => {
    let Loader = options.loaderComponent;
    let { loadingStyles, wrapperStyles, loadingClassCSS, wrapperClassCSS } = options;
    return (
      <>
        <div className={wrapperClassCSS} ref={containerElement} style={wrapperStyles || {}}>
          {options.progress.show && progress.show && (
            <Progress value={progress.value} color={progressColor} />
          )}
          <div className={loadingClassCSS} style={loadingStyles || {}}>
            {Loader ? (
              <Loader color={options.loadingColor} />
            ) : (
              <ClipLoader color={options.loadingColor} />
            )}
          </div>
        </div>
        {children}
      </>
    );
  };

  const renderError = () => {
    let Button = options.buttonComponent;
    let Error = options.errorComponent;
    console.log('Error :', Error);
    let { errorStyles, wrapperStyles, errorClassCSS, wrapperClassCSS } = options;
    return (
      <>
        <div className={wrapperClassCSS} ref={containerElement} style={wrapperStyles || {}}>
          {options.progress.show && progress.show && (
            <Progress value={progress.value} color={progressColor} />
          )}
          {Error ? (
            <Error options={options} />
          ) : (
            <div className={errorClassCSS} style={errorStyles || {}}>
              <span>{options.errorMessage}</span>
              {Button ? <Button doRetry={onRetry} /> : <button onClick={onRetry}>Retry</button>}
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
