import React from 'react';
import { FetcherOptions } from './Fetcher';
import { ClipLoader } from 'react-spinners';
import { FetcherRef } from '../fetcherRef';

export interface LoadingDisplayProps {
  refs: FetcherRef[];
  loading: boolean;
  options: FetcherOptions;
}

const LoadingDisplay: React.FC<LoadingDisplayProps> = ({ options, refs, loading }) => {
  const Loader = options.loaderComponent;
  const { loadingStyles, loadingClassCSS, hideLoader } = options;

  return (
    loading &&
    !hideLoader && (
      <div className={loadingClassCSS} style={loadingStyles || {}}>
        {Loader ? (
          <Loader color={options.loadingColor} />
        ) : (
          <ClipLoader color={options.loadingColor} />
        )}
      </div>
    )
  );
};

export { LoadingDisplay };
