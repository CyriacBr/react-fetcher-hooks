import { FetcherRef } from '../fetcherRef';
import { useState, useLayoutEffect, useEffect } from 'react';
import { useFetcherCallback } from './useFetcherCallback';

export function useFetcherStatus(ref: FetcherRef | FetcherRef[]) {
  const refs = Array.isArray(ref) ? ref : [ref];
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stack, setStack] = useState(0);

  useFetcherCallback(
    {
      'force-end-loading': onStopForcedLoading,
      'force-loading': onForceLoading,
      end: onFetchEnd,
      error: onError,
      start: onFetchStart
    },
    refs,
    [refs, stack, loading]
  );

  useEffect(() => {
    setLoading(stack > 0);
  }, [stack]);

  function onError() {
    setError(true);
  }

  function onFetchStart() {
    setError(false);
    setStack(stack + 1);
  }

  function onForceLoading() {
    setLoading(true);
  }

  function onStopForcedLoading() {
    setLoading(false);
  }

  function onFetchEnd() {
    setStack(stack - 1);
  }

  return {
    error,
    loading
  };
}
