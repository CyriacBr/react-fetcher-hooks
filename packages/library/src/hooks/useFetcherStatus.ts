import { FetcherRef } from "../fetcherRef";
import { useState, useLayoutEffect, useEffect } from "react";
import { useFetcherCallbacks } from "./useFetcherCallbacks";
import { useFetcherCallback } from "./useFetcherCallback";

export function useFetcherStatus(
  ref: FetcherRef | FetcherRef[],
  initialLoading = false
) {
  const refs = Array.isArray(ref) ? ref : [ref];
  const hasError = refs.some(ref => ref.hasFailedTask());
  const isLoading = refs.some(ref => ref.hasPendingTask() || ref.forcedLoading);
  const [error, setError] = useState(hasError);
  const [loading, setLoading] = useState(initialLoading || isLoading);
  const [stack, setStack] = useState(isLoading ? refs.length : 0);
  const [loadedOnce, setLoadedOnce] = useState(false);

  useFetcherCallback(refs)
    .on("force-loading", onForceLoading)
    .on("force-end-loading", onStopForcedLoading)
    .on("start", onFetchStart)
    .on("end", onFetchEnd)
    .on("error", onError);

  useEffect(() => {
    if (initialLoading) {
      setLoading(loadedOnce ? stack > 0 : true);
    } else {
      setLoading(stack > 0);
    }
  }, [stack, loadedOnce]);

  function onError() {
    setError(true);
  }

  function onFetchStart() {
    setError(false);
    setStack(v => v + 1);
  }

  function onForceLoading() {
    setLoading(true);
  }

  function onStopForcedLoading() {
    setLoading(false);
  }

  function onFetchEnd() {
    setStack(v => v - 1);
    setLoadedOnce(true);
  }

  return {
    error,
    loading,
    loadedOnce
  };
}
