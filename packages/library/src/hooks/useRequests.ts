import { AxiosPromise } from 'axios';
import { useMemo, useState, useEffect } from 'react';
import { FetcherRef, AxiosPromisesOf } from '../fetcherRef';

export function useRequests<T extends any[], P>(requests: (arg?: P) => AxiosPromisesOf<T>[], auto?: boolean) {
  const ref = useMemo(() => new FetcherRef(), []);
  const [data, setData] = useState<T>();

  function trigger(arg: P, onResult: (data: T) => void): void;
  function trigger(onResult: (data: T) => void): void;
  function trigger(): void;
  function trigger() {
    if (arguments.length === 0 || typeof arguments[0] !== 'function') {
      ref.fetchMany(requests, result => setData(result));
      return;
    }
    const arg: any = arguments.length === 1 ? null : arguments[1];
    const onResult: (data: T) => void = arguments.length === 1 ? arguments[0] : arguments[1];
    const handle = arg ? () => requests(arg) : requests;
    ref.fetchMany(handle, onResult);
  }

  useEffect(() => {
    if (auto) {
      ref.fetchMany<T, P>(requests, result => setData(result));
    }
    return () => {
      ref.cancel();
    };
  }, []);

  return [ref, trigger, data] as [FetcherRef, typeof trigger, T];
}