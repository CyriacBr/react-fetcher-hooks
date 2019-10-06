import React from 'react';
import { FetcherOptions } from './Fetcher';
import { FetcherRef } from '../fetcherRef';

export interface ErrorDisplayProps {
  error: boolean;
  refs: FetcherRef[];
  options: FetcherOptions;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ options, error, refs }) => {
  const Button = options.buttonComponent;
  const Error = options.errorComponent;
  const { errorClassCSS, errorStyles } = options;

  function hasFailedTasks() {
    for (const ref of refs) {
      if (ref.hasFailedTask()) return true;
    }
    return false;
  }

  function onRetry() {
    for (const ref of refs) {
      ref.retry();
    }
  }
  return (
    error && (
      <>
        {Error ? (
          <Error options={options} doRetry={onRetry} />
        ) : (
          <div className={errorClassCSS} style={errorStyles || {}}>
            <span className="message">{options.errorMessage}</span>
            {hasFailedTasks() &&
              (Button ? <Button doRetry={onRetry} /> : <button onClick={onRetry}>Retry</button>)}
          </div>
        )}
      </>
    )
  );
};

export { ErrorDisplay };
