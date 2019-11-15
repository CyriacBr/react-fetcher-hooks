import { FetcherEvent, FetcherRef } from '../fetcherRef';
import { useLayoutEffect, useCallback } from 'react';

type EventCallbacks = {
  [T in FetcherEvent]?: () => void;
};

export function useFetcherCallbacks(
  callbacks: EventCallbacks,
  ref: FetcherRef | FetcherRef[],
  deps?: readonly any[]
) {
  const refs = Array.isArray(ref) ? ref : [ref];
  const _callbacks = callbacks;//useMemo(() => callbacks, deps);
  useLayoutEffect(() => {
    for (const ref of refs) {
      for (const [key, callback] of Object.entries(_callbacks)) {
        ref.on(key as any, callback);
      }
    }
    return () => {
      for (const ref of refs) {
        for (const [key, callback] of Object.entries(_callbacks)) {
          ref.off(key as any, callback);
        }
      }
    };
  }, deps || []);
}
