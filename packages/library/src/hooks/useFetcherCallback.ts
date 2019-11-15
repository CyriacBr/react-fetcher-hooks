import { FetcherEvent, FetcherRef } from "../fetcherRef";
import { useLayoutEffect, useCallback } from "react";

export function useFetcherCallback(ref: FetcherRef | FetcherRef[]) {
  const refs = Array.isArray(ref) ? ref : [ref];

  const handler = {
    on: (event: FetcherEvent, cb: () => void, deps?: any[]) => {
      const _callback = useCallback(cb, deps);
      useLayoutEffect(() => {
        for (const ref of refs) {
          ref.on(event, _callback);
        }
        return () => {
          for (const ref of refs) {
            ref.off(event, _callback);
          }
        };
      }, deps || []);
      return handler;
    }
  };
  return handler;
}
