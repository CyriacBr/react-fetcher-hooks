import { AxiosPromise, AxiosResponse } from 'axios';

export type FetcherEvent = 'start' | 'end' | 'error' | 'force-loading' | 'force-end-loading';

export interface Task {
  type: 'fetch' | 'custom';
  getPromise: () => Promise<any>;
  onResult: (data: any) => void;
  status: 'pending' | 'failed';
  canceled: boolean;
  isMultiple: false;
}

export interface ManyTask {
  type: 'fetch' | 'custom';
  getPromise: () => Promise<any>[];
  onResult: (data: any) => void;
  status: 'pending' | 'failed';
  canceled: boolean;
  isMultiple: true;
}

export type AxiosPromisesOf<T extends any[]> = AxiosPromise<T[number]>;
export type PromisesOf<T extends any[]> = Promise<T[number]>;

export type FetcherRequest<T, P> = (arg?: P) => AxiosPromise<T>;
export type FetcherRequests<T extends any[], P> = (arg?: P) => AxiosPromisesOf<T>[];
export type FetcherCustomRequest<T, P> = (arg?: P) => Promise<T>;
export type FetcherCustomRequests<T extends any[], P> = (arg?: P) => PromisesOf<T>[];

export class FetcherRef {
  listeners: { [key: string]: (() => void)[] } = {};
  task: Task | ManyTask;
  minDelay = 300;

  on(event: FetcherEvent, fn: () => void) {
    this.listeners[event] = [...(this.listeners[event] || []), fn];
  }

  off(event: FetcherEvent, fn: () => void) {
    this.listeners[event] = (this.listeners[event] || []).filter(v => v !== fn);
  }

  fire(event: FetcherEvent) {
    for (const fn of this.listeners[event] || []) {
      fn();
    }
  }

  setLoading(value: boolean) {
    this.fire(value ? 'force-loading' : 'force-end-loading');
  }

  fetch<T, P = any>(request: FetcherRequest<T, P>, onResult: (data: T) => void) {
    this.task = {
      type: 'fetch',
      getPromise: request,
      onResult,
      canceled: false,
      isMultiple: false,
      status: 'pending'
    };
    this.processTask(this.task);
  }

  fetchMany<T extends any[], P = any>(
    requests: FetcherRequests<T, P>,
    onResult: (data: T) => void
  ) {
    this.task = {
      type: 'fetch',
      getPromise: requests,
      onResult,
      canceled: false,
      isMultiple: true,
      status: 'pending'
    } as ManyTask;
    this.processManyTask(this.task);
  }

  handle<T, P = any>(request: FetcherCustomRequest<T, P>, onResult: (data: T) => void) {
    this.task = {
      type: 'custom',
      getPromise: request,
      onResult,
      canceled: false,
      isMultiple: false,
      status: 'pending'
    };
    this.processTask(this.task);
  }

  handleMany<T extends any[], P = any>(
    requests: FetcherCustomRequests<T, P>,
    onResult: (data: T) => void
  ) {
    this.task = {
      type: 'custom',
      getPromise: requests,
      onResult,
      canceled: false,
      isMultiple: true,
      status: 'pending'
    } as ManyTask;
    this.processManyTask(this.task);
  }

  cancel() {
    if (this.task) {
      this.task.canceled = true;
    }
  }

  hasFailedTask() {
    return this.task && this.task.status === 'failed';
  }

  retry() {
    if (this.task) {
      this.task.isMultiple ? this.processManyTask(this.task) : this.processTask(this.task as Task);
    }
  }

  async processTask(task: Task) {
    let { getPromise, onResult, type } = task;
    task.status = 'pending';
    try {
      this.fire('start');
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
      this.fire('end');
      if (task.canceled) {
        return;
      }
      if (error) {
        throw error;
      }
      this.task = null;
      switch (type) {
        case 'custom':
          return onResult(response);
        case 'fetch':
          let { data, status } = response;
          if (String(status)[0] === '2') {
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
      this.fire('error');
    }
  }

  async processManyTask(task: ManyTask) {
    let { getPromise, onResult, type } = task;
    task.status = 'pending';
    try {
      this.fire('start');
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
      this.fire('end');
      if (task.canceled) {
        return;
      }
      if (error) {
        throw error;
      }
      this.task = null;
      switch (type) {
        case 'custom':
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
            return onResult(dataArr);
          }
          break;
      }
      throw new Error('Invalid response');
    } catch (error) {
      console.error('Error caught during fetch');
      console.error(error);
      task.status = 'failed';
      this.fire('error');
    }
  }

  _waitDelay() {
    return new Promise(resolve => {
      setTimeout(resolve, this.minDelay);
    });
  }
}
