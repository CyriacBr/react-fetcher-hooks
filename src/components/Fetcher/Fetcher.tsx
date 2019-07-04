import React, { useState, useRef, useEffect } from 'react';
import { FetcherAPI, FetcherError } from './useFetcher';
import { ClipLoader } from 'react-spinners';

export interface FetcherProps {
  fetcher: FetcherAPI;
}

export const Fetcher: React.FC<FetcherProps> = ({ fetcher, children }) => {
  if (!fetcher) {
    throw new Error('You need to pass a FetcherAPI to the Fetcher component.');
  }
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<FetcherError>(null);
  fetcher.useLoading(loading, setLoading);
  fetcher.useError(error, setError);

  const containerElement = useRef(null);
  useEffect(() => {
    let el = containerElement.current as HTMLElement;
    if (!el) return;
    let parent = el.parentElement as HTMLElement;
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
    let Loader = fetcher.options.loaderComponent;
    return (
      <>
        <div className="fetcher-wrapper" ref={containerElement}>
          <div className="fetcher-loading">
            {Loader ? (
              <Loader color={fetcher.options.loadingColor} />
            ) : (
              <ClipLoader color={fetcher.options.loadingColor} />
            )}
          </div>
        </div>
        {children}
      </>
    );
  };

  const renderError = () => {
    let Button = fetcher.options.buttonComponent;
    return (
      <>
        <div className="fetcher-wrapper" ref={containerElement}>
          <div className="fetcher-error">
            <span>{fetcher.options.errorMessage}</span>
            {Button ? <Button doRetry={onRetry} /> : <button onClick={onRetry}>Retry</button>}
          </div>
        </div>
        {children}
      </>
    );
  };

  return <>{loading ? renderLoading() : error ? renderError() : children}</>;
};
