import { AxiosPromise } from 'axios';
import { useMemo, useState, useEffect } from 'react';
import { FetcherRef } from '../fetcherRef';

export function useRequest<T, P>(request: (arg?: P) => AxiosPromise<T>, auto?: boolean) {
  const ref = useMemo(() => new FetcherRef(), []);
  const [data, setData] = useState<T>([] as any);

  function trigger(arg: P, onResult: (data: T) => void): void;
  function trigger(arg: P): void;
  function trigger(onResult: (data: T) => void): void;
  function trigger(): void;
  function trigger() {
    if (arguments.length === 2) {
      const [arg, onResult] = arguments;
      ref.fetch(() => request(arg), onResult);
    } else if (arguments.length === 1) {
      const [argOrOnResult] = arguments;
      if (typeof argOrOnResult === 'function') {
        ref.fetch(request, argOrOnResult);
      } else {
        ref.fetch(() => request(argOrOnResult), result => setData(result));
      }
    } else {
      ref.fetch(request, result => setData(result));
    }
  }

  useEffect(() => {
    if (auto) {
      ref.fetch<T, P>(request, result => setData(result));
    }
    return () => {
      ref.cancel();
    };
  }, []);

  return [ref, trigger, data, setData] as [FetcherRef, typeof trigger, T, typeof setData];
}
