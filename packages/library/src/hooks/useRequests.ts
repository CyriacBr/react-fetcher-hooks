import { AxiosPromise } from 'axios';
import { useMemo, useState, useEffect } from 'react';
import { FetcherRef, AxiosPromisesOf } from '../fetcherRef';

export function useRequests<T extends any[], P>(requests: (arg?: P) => AxiosPromisesOf<T>[], auto?: boolean) {
  const ref = useMemo(() => new FetcherRef(), []);
  const [data, setData] = useState<T>([] as any);

  function trigger(arg: P, onResult: (data: T) => void): void;
  function trigger(onResult: (data: T) => void): void;
  function trigger(arg: P): void;
  function trigger(): void;
  function trigger() {
    if (arguments.length === 2) {
      const [arg, onResult] = arguments;
      ref.fetchMany(() => requests(arg), onResult);
    } else if (arguments.length === 1) {
      const [argOrOnResult] = arguments;
      if (typeof argOrOnResult === 'function') {
        ref.fetchMany(requests, argOrOnResult);
      } else {
        ref.fetchMany(() => requests(argOrOnResult), result => setData(result));
      }
    } else {
      ref.fetchMany(requests, result => setData(result));
    }
  }

  useEffect(() => {
    if (auto) {
      ref.fetchMany<T, P>(requests, result => setData(result));
    }
    return () => {
      ref.cancel();
    };
  }, []);

  return [ref, trigger, data, setData] as [FetcherRef, typeof trigger, T, typeof setData];
}