import { IHttpOptions } from './FetchWrapper';

interface IHandler {
  fulfilled?: (
    config: IHttpOptions,
  ) => Promise<IHttpOptions> | IHttpOptions;
  rejected?: (error: any) => Promise<any>;
}

export default class InterceptorManager {
  private handlers: IHandler[];

  constructor() {
    this.handlers = [];
  }

  use(
    fulfilled?: (config: any) => Promise<any> | any,
    rejected?: (error: any) => Promise<any>,
  ) {
    this.handlers.push({
      fulfilled,
      rejected,
    });
    return this.handlers.length - 1;
  }

  eject(id: number) {
    if (this.handlers[id]) {
      this.handlers[id] = {};
    }
  }

  clear() {
    this.handlers = [];
  }

  execute(httpOptions: IHttpOptions): Promise<any> {
    let promise: Promise<any> = Promise.resolve(httpOptions);

    this.handlers.forEach(({ fulfilled, rejected }) => {
      promise = promise.then(
        (httpOptions: IHttpOptions) =>
          fulfilled && fulfilled(httpOptions),
        rejected,
      );
    });

    return promise;
  }
}
