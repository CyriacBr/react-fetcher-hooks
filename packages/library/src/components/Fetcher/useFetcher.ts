import { AxiosResponse, AxiosPromise } from 'axios';
import { ProgressOptions } from '../Progress/useProgress';
import { useMemo } from 'react';
import { PlaceholderOptions } from '../Placeholder/Placeholder';

export interface FetcherError {
  message: string;
}

export interface FetcherOptions {
  errorMessage?: string;
  minDelay?: number;
  loadingColor?: string;
  buttonComponent?: (props: { doRetry: () => void }) => JSX.Element;
  loaderComponent?: (props: { color: string }) => JSX.Element;
  errorComponent?: (props: { options: FetcherOptions }) => JSX.Element;
  wrapperClassCSS?: string;
  loadingClassCSS?: string;
  errorClassCSS?: string;
  wrapperStyles?: React.CSSProperties;
  loadingStyles?: React.CSSProperties;
  errorStyles?: React.CSSProperties;
  wrapperBackgroundColor?: string;
  dimBackground?: boolean;
  hideLoader?: boolean;
  progress?: {
    show?: boolean;
    color?: string;
    errorColor?: string;
    position?: 'top' | 'bottom';
    styles?: React.CSSProperties;
  } & Partial<ProgressOptions>;
  adjustBorderRadius?: boolean;
  placeholder?: {
    show?: boolean;
  } & Partial<PlaceholderOptions>;
}

export type FetcherEvent =
  | 'fetch-start'
  | 'fetch-end'
  | 'all-fetch-end'
  | 'error'
  | 'loading-forced-start'
  | 'loading-forced-end'
  | 'error-forced';

export interface Task {
  type: 'fetch' | 'custom';
  getPromise: () => AxiosPromise<any> | Promise<any>;
  onResult: (data: any) => void;
  status: 'pending' | 'failed';
  canceled: boolean;
  isMultiple: false;
}

export interface ManyTask {
  type: 'fetch' | 'custom';
  getPromise: () => (AxiosPromise<any> | Promise<any>)[];
  onResult: (data: any) => void;
  status: 'pending' | 'failed';
  canceled: boolean;
  isMultiple: true;
}

export class FetcherAPI {
  loading: boolean;
  tasks: (Task | ManyTask)[];
  listeners: { [key: string]: Function[] };
  options: FetcherOptions;
  workingCounter: number;

  constructor(options?: FetcherOptions) {
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
      adjustBorderRadius: true,
      wrapperBackgroundColor: '#ffffff80',
      dimBackground: true,
      hideLoader: false,
      ...options,
      progress: {
        show: false,
        position: 'top',
        color: '#36d7b7',
        errorColor: '#cd3f45',
        tickDelay: { min: 400, max: 600 },
        valuePerTick: { min: 2, max: 3 },
        styles: null,
        ...((options && options.progress) || {})
      },
      placeholder: {
        show: false,
        classTarget: '--p',
        wrapperClassCSS: 'placeholder-wrapper',
        color: '#eee',
        highlightColor: '#f5f5f5',
        divide: false,
        truncateLastLine: false,
        ...((options && options.placeholder) || {})
      }
    };
    this.workingCounter = 0;
    this.tasks = [];
  }

  addListener(event: FetcherEvent, func: Function) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(func);
  }

  removeListener(event: FetcherEvent, func: Function) {
    if (!this.listeners[event]) return;
    this.listeners[event] = this.listeners[event].filter(f => f !== func);
  }

  isBusy() {
    return this.workingCounter > 0;
  }

  hasFailedTasks() {
    return this.tasks.filter(t => t.status === 'failed').length > 0;
  }

  private callListener(event: FetcherEvent, ...args: any[]) {
    switch (event) {
      case 'fetch-start':
        this.workingCounter++;
        break;
      case 'fetch-end':
        this.workingCounter--;
        if (!this.isBusy()) {
          this.callListener('all-fetch-end');
        }
        break;
      default:
        break;
    }
    for (const func of this.listeners[event] || []) {
      func(...args);
    }
  }

  fetch<T>(getResponse: () => AxiosPromise<T>, onResult: (data: T) => void) {
    let task: Task = {
      type: 'fetch',
      getPromise: getResponse,
      onResult,
      status: 'pending',
      canceled: false,
      isMultiple: false
    };
    this.tasks.push(task);
    this.processTask(task);
    return this;
  }

  async fetchMany<T>(getResponse: () => AxiosPromise<T>[], onResult: (data: T) => void) {
    let task: ManyTask = {
      type: 'fetch',
      getPromise: getResponse,
      onResult,
      status: 'pending',
      canceled: false,
      isMultiple: true
    };
    this.tasks.push(task);
    this.processManyTask(task);
    return this;
  }

  handle<T>(getPromise: () => Promise<T>, onResult: (result: T) => void) {
    let task: Task = {
      type: 'custom',
      getPromise,
      onResult,
      status: 'pending',
      canceled: false,
      isMultiple: false
    };
    this.tasks.push(task);
    this.processTask(task);
    return this;
  }

  async processTask(task: Task) {
    let { getPromise, onResult, type } = task;
    task.status = 'pending';
    try {
      await this.callListener('fetch-start');
      let error = null;
      let [response]: [AxiosResponse, any] = await Promise.all([
        /**
         * Don't allow Promise.all to throw because we want to
         * wait for the delay regardless of if there's an error
         * or not
         */
        getPromise().catch(e => {
          error = e;
          return null;
        }),
        this._waitDelay()
      ]);
      await this.callListener('fetch-end', response);
      if (task.canceled) {
        return;
      }
      if (error) {
        throw error;
      }
      switch (type) {
        case 'custom':
          this.completeTask(task);
          return onResult(response);
        case 'fetch':
          let { data, status } = response;
          if (String(status)[0] === '2') {
            this.completeTask(task);
            if (data != null) {
              return onResult(data);
            }
            return onResult(response);
          }
          break;
      }
      throw new Error('Invalid response');
    } catch (error) {
      console.error('Error caught during fetch');
      console.error(error);
      task.status = 'failed';
      await this.callListener('error', null);
    }
  }

  async processManyTask(task: ManyTask) {
    let { getPromise, onResult, type } = task;
    task.status = 'pending';
    try {
      await this.callListener('fetch-start');
      let error = null;
      let [response]: [AxiosResponse[], any] = await Promise.all([
        /**
         * Don't allow Promise.all to throw because we want to
         * wait for the delay regardless of if there's an error
         * or not
         */
        Promise.all(getPromise()).catch(e => {
          error = e;
          return null;
        }),
        this._waitDelay()
      ]);
      await this.callListener('fetch-end', response);
      if (task.canceled) {
        return;
      }
      if (error) {
        throw error;
      }
      switch (type) {
        case 'custom':
          this.completeTask(task);
          return onResult(response);
        case 'fetch':
          let dataArr = [];
          let hasError = false;
          for (const res of response) {
            let { data, status } = res;
            if (String(status)[0] !== '2') {
              hasError = true;
              break;
            }
            dataArr.push(data);
          }
          if (!hasError) {
            this.completeTask(task);
            return onResult(dataArr);
          }
          break;
      }
      throw new Error('Invalid response');
    } catch (error) {
      console.error('Error caught during fetch');
      console.error(error);
      task.status = 'failed';
      await this.callListener('error', null);
    }
  }

  completeTask(task: Task | ManyTask) {
    this.tasks = this.tasks.filter(t => t !== task);
  }

  cancel() {
    for (const task of this.tasks) {
      task.canceled = true;
    }
  }

  _waitDelay() {
    return new Promise(resolve => {
      setTimeout(resolve, this.options.minDelay);
    });
  }

  setLoading(value: boolean) {
    this.callListener(value ? 'loading-forced-start' : 'loading-forced-end');
  }

  setError(value: FetcherError) {
    this.callListener('error-forced', value);
  }

  retry() {
    let failedTasks = this.tasks.filter(task => task.status === 'failed');
    for (const task of failedTasks) {
      if (task.isMultiple) {
        this.processManyTask(task);
      } else {
        this.processTask(task as Task);
      }
    }
  }
}

export function useFetcher(options?: FetcherOptions) {
  const api = useMemo(() => new FetcherAPI(options), []);
  return api;
}
