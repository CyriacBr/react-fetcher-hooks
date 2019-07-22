import { AxiosResponse, AxiosPromise } from 'axios';
import { SetStateAction } from 'react';
import { ProgressOptions } from '../Progress/useProgress';

export interface FetcherError {
  message: string;
  response: AxiosResponse;
}

export interface FetcherOptions {
  errorMessage: string;
  minDelay: number;
  loadingColor: string;
  buttonComponent: (props: { doRetry: () => void }) => JSX.Element;
  loaderComponent: (props: { color: string }) => JSX.Element;
  errorComponent: (props: { options: FetcherOptions }) => JSX.Element;
  wrapperClassCSS: string;
  loadingClassCSS: string;
  errorClassCSS: string;
  wrapperStyles: React.CSSProperties;
  loadingStyles: React.CSSProperties;
  errorStyles: React.CSSProperties;
  progress: {
    show: boolean;
    color: string;
    errorColor: string;
    position: 'top' | 'bottom';
    styles: React.CSSProperties;
  } & ProgressOptions;
}

export type FetcherEvent =
  | 'fetch-start'
  | 'fetch-end'
  | 'error'
  | 'loading-forced-start'
  | 'loading-forced-end'
  | 'error-forced';

export class FetcherAPI {
  loading: boolean;
  _setLoading: React.Dispatch<SetStateAction<boolean>>;
  error: FetcherError;
  _setError: React.Dispatch<SetStateAction<FetcherError>>;
  retryStatus: {
    type: 'fetch' | 'custom';
    promise: Promise<AxiosResponse<any>> | Promise<any>;
    onResult: (data: any) => void;
  };
  listeners: { [key: string]: Function[] };
  options: Partial<FetcherOptions>;

  constructor(options?: Partial<FetcherOptions>) {
    this.listeners = {};
    this.options = {
      errorMessage: 'An error occured',
      minDelay: 500,
      loadingColor: '#36d7b7',
      buttonComponent: null,
      loaderComponent: null,
      errorComponent: null,
      wrapperClassCSS: 'fetcher-wrapper',
      loadingClassCSS: 'fetcher-loading',
      errorClassCSS: 'fetcher-error',
      ...options,
      progress: {
        show: false,
        position: 'top',
        color: '#36d7b7',
        errorColor: '#cd3f45',
        tickDelay: { min: 500, max: 1000 },
        valuePerTick: { min: 2, max: 3 },
        styles: null,
        ...((options && options.progress) || {}),
      },
    };
  }

  addListener(event: FetcherEvent, func: Function) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(func);
  }

  removeListener(event: FetcherEvent, func: Function) {
    if (!this.listeners[event]) return;
    this.listeners[event] = this.listeners[event].filter(f => f !== func);
  }

  private callListener(event: FetcherEvent, ...args: any[]) {
    switch (event) {
      case 'fetch-start':
        this._setLoading(true);
        break;
      case 'fetch-end':
        this._setLoading(false);
        break;
      case 'error':
        this._setLoading(false);
        this._setError({
          response: args[0],
          message: this.options.errorMessage
        });
        break;
      default:
        break;
    }
    for (const func of this.listeners[event] || []) {
      func(...args);
    }
  }

  async fetch<T>(responsePromise: AxiosPromise<T>, onResult: (data: T) => void) {
    this.retryStatus = {
      type: 'fetch',
      promise: responsePromise,
      onResult
    };
    try {
      await this.callListener('fetch-start');
      let error = null;
      let [response] = await Promise.all([
        responsePromise.catch(e => {
          error = e;
          return null;
        }),
        this._waitDelay()
      ]);
      await this.callListener('fetch-end', response);
      if (error) {
        throw error;
      }
      let { data } = response;
      if (data != null) {
        return onResult(data);
      }
      await this.callListener('error', response);
    } catch (error) {
      console.error('Unexpected error during fetch');
      console.error(error);
      await this.callListener('error', null);
    }
  }

  async handle<T>(promise: Promise<T>, onResult: (result: T) => void) {
    this.retryStatus = {
      type: 'custom',
      promise,
      onResult
    };
    try {
      await this.callListener('fetch-start');
      let error = null;
      let [result] = await Promise.all([
        promise.catch(e => {
          error = e;
          return null;
        }),
        this._waitDelay()
      ]);
      await this.callListener('fetch-end', result);
      if (error) {
        throw error;
      }
      if (result != null) {
        return onResult(result);
      }
      await this.callListener('error', null);
    } catch (error) {
      console.error('Unexpected error during handle');
      console.error(error);
      await this.callListener('error', null);
    }
  }

  _waitDelay() {
    return new Promise(resolve => {
      setTimeout(resolve, this.options.minDelay);
    });
  }

  setLoading(value: boolean) {
    this._setLoading(value);
    this.callListener(value ? 'loading-forced-start' : 'loading-forced-end');
  }

  setError(value: FetcherError) {
    this._setError(value);
    this.callListener('error-forced');
  }

  retry() {
    if (this.retryStatus) {
      let { type } = this.retryStatus;
      if (type === 'custom') {
        this.handle(this.retryStatus.promise, this.retryStatus.onResult);
      } else {
        this.fetch(this.retryStatus.promise, this.retryStatus.onResult);
      }
    }
  }

  useLoading(loading: boolean, _setLoading: React.Dispatch<SetStateAction<boolean>>) {
    this.loading = loading;
    this._setLoading = _setLoading;
  }

  useError(error: FetcherError, _setError: React.Dispatch<SetStateAction<FetcherError>>) {
    this.error = error;
    this._setError = _setError;
  }
}

export function useFetcher(options?: Partial<FetcherOptions>) {
  const api = new FetcherAPI(options);
  return api;
}
