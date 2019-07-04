import { AxiosResponse } from 'axios';
import { SetStateAction } from 'react';

export interface FetcherError {
  message: string;
  status: number;
}

export interface FetcherOptions {
  errorMessage: string;
  minDelay: number;
  loadingColor: string;
  buttonComponent: (props: { doRetry: () => void }) => JSX.Element;
  loaderComponent: (props: { color: string}) => JSX.Element;
}

export class FetcherAPI {
  loading: boolean;
  setLoading: React.Dispatch<SetStateAction<boolean>>;
  error: FetcherError;
  setError: React.Dispatch<SetStateAction<FetcherError>>;
  fetchStatus: {
    promise: Promise<AxiosResponse<any>>;
    onResult: (data: any) => void;
  };
  options: FetcherOptions;

  constructor(options?: FetcherOptions) {
    this.options = {
      errorMessage: 'An error occured',
      minDelay: 500,
      loadingColor: '#36d7b7',
      buttonComponent: null,
      loaderComponent: null,
      ...options
    };
  }

  async fetch<T>(response: Promise<AxiosResponse<T>>, onResult: (data: T) => void) {
    this.fetchStatus = {
      promise: response,
      onResult
    };
    try {
      this.setLoading(true);
      let [{ data, status }] = await Promise.all([
        response,
        new Promise(resolve => {
          setTimeout(resolve, this.options.minDelay);
        })
      ]);
      this.setLoading(false);
      if (data != null) {
        return onResult(data);
      }
      this.setError({
        status,
        message: this.options.errorMessage
      });
    } catch (error) {
      console.error('Unexpected error during fetch');
      console.error(error);
      this.setLoading(true);
      await new Promise(resolve => {
        setTimeout(resolve, this.options.minDelay);
      });
      this.setLoading(false);
      this.setError({
        status: 0,
        message: this.options.errorMessage
      });
    }
  }

  retry() {
    if (this.fetchStatus) {
      this.fetch(this.fetchStatus.promise, this.fetchStatus.onResult);
    }
  }

  useLoading(loading: boolean, setLoading: React.Dispatch<SetStateAction<boolean>>) {
    this.loading = loading;
    this.setLoading = setLoading;
  }

  useError(error: FetcherError, setError: React.Dispatch<SetStateAction<FetcherError>>) {
    this.error = error;
    this.setError = setError;
  }
}

export function useFetcher(options?: FetcherOptions) {
  const api = new FetcherAPI(options);
  return api;
}
