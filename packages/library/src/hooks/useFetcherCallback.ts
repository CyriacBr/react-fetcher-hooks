import { FetcherEvent, FetcherRef } from '../fetcherRef';
import { useLayoutEffect } from 'react';

type EventCallbacks = {
  [T in FetcherEvent]?: () => void;
};

export function useFetcherCallback(
  callbacks: EventCallbacks,
  ref: FetcherRef | FetcherRef[],
  deps?: readonly any[]
) {
  const refs = Array.isArray(ref) ? ref : [ref];
  useLayoutEffect(() => {
    for (const ref of refs) {
      for (const [key, callback] of Object.entries(callbacks)) {
        ref.on(key as any, callback);
      }
    }
    return () => {
      for (const ref of refs) {
        for (const [key, callback] of Object.entries(callbacks)) {
          ref.off(key as any, callback);
        }
      }
    };
  }, deps || []);
}
