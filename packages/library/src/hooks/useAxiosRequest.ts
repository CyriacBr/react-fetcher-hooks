import axios from 'axios';
import { useMemo, useState, useEffect } from 'react';
import { FetcherRef } from '../fetcherRef';

type Verb = 'GET' | 'POST' | 'DELETE' | 'UPDATE';

function getRequest(verb: Verb, url: string, data: any) {
  switch (verb) {
    case 'GET':
      return axios.get(url);
    case 'DELETE':
      return axios.delete(url);
    case 'POST':
      return axios.post(url, data);
    case 'UPDATE':
      return axios.patch(url, data);
    default:
      throw new Error(`Unhandled verb`);
  }
}

export function useAxiosRequest<T>(
  getUrl: (arg?: string | number) => string,
  verb: Verb = 'GET',
  auto?: boolean
) {
  const ref = useMemo(() => new FetcherRef(), []);
  const [data, setData] = useState<T>();

  function trigger(arg: string | number, data: Partial<T>, onResult: (data: T) => void): void;
  function trigger(arg: string | number, onResult: (data: T) => void): void;
  function trigger(data: Partial<T>, onResult: (data: T) => void): void;
  function trigger(onResult: (data: T) => void): void;
  function trigger(): void;
  function trigger() {
    if (arguments.length === 3) {
      const arg = arguments[0];
      const data = arguments[1];
      const onResult = arguments[2];
      ref.fetch(() => getRequest(verb, getUrl(arg), data), onResult);
    } else if (arguments.length === 2) {
      const argOrData = arguments[0];
      const onResult = arguments[1];
      if (typeof argOrData === 'object') {
        ref.fetch(() => getRequest(verb, getUrl(), argOrData), onResult);
      } else {
        ref.fetch(() => getRequest(verb, getUrl(argOrData), null), onResult);
      }
    } else if (arguments.length === 1) {
      const onResult = arguments[0];
      ref.fetch(() => getRequest(verb, getUrl(), null), onResult);
    } else {
      ref.fetch(() => getRequest(verb, getUrl(), null), result => setData(result));
    }
  }

  useEffect(() => {
    if (auto) {
      ref.fetch<T, any>(() => getRequest(verb, getUrl(), null), result => setData(result));
    }
    return () => {
      ref.cancel();
    };
  }, []);

  return [ref, trigger, data] as [FetcherRef, typeof trigger, T];
}
