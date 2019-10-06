import React from 'react';
import { FetcherOptions } from './Fetcher';
import { FetcherRef } from '../fetcherRef';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedoAlt } from '@fortawesome/free-solid-svg-icons';

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
          <Error options={options} doRetry={onRetry} showButton={hasFailedTasks()} />
        ) : (
          <div className={errorClassCSS} style={errorStyles || {}}>
            <div className='error-message'>
              <span>{options.errorMessage}</span>
              {hasFailedTasks() &&
                (Button ? (
                  <Button doRetry={onRetry} />
                ) : (
                  <div className='error-button' onClick={onRetry}>
                    <FontAwesomeIcon icon={faRedoAlt} />
                  </div>
                ))}
            </div>
          </div>
        )}
      </>
    )
  );
};

export { ErrorDisplay };
