import InterceptorManager from './InterceptorManager';

enum EHttpMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

interface IFetchConfiguration {
  baseURL: string;
  headers: object;
}

export interface IHttpOptions {
  headers?: Record<string, string>;
  body?: object;
}

interface IHttpConfiguration extends IHttpOptions {
  method?: EHttpMethods;
}

interface IInterceptor {
  request: InterceptorManager;
  response: InterceptorManager;
}

export default class FetchWrapper {
  private static instance: FetchWrapper;
  private baseURL: string;
  private headers: object;
  public interceptors: IInterceptor;

  private constructor(configuration: IFetchConfiguration) {
    this.baseURL = configuration.baseURL;
    this.headers = configuration.headers;
    this.interceptors = {
      request: new InterceptorManager(),
      response: new InterceptorManager(),
    };
  }

  static createInstance(
    configuration: IFetchConfiguration,
  ): FetchWrapper {
    FetchWrapper.instance = new FetchWrapper(configuration);
    return FetchWrapper.instance;
  }

  private handleAsText<T>(response: any): Promise<T> {
    return response.text();
  }

  private responseAsJSON<T>(response: any): Promise<T> {
    return response.length ? JSON.parse(response) : '';
  }

  private validateResponse<T>(response: any): Promise<T> {
    if (!response.ok) {
      throw response;
    }
    return response;
  }

  private fetchWrapper<T>(
    path: string,
    httpConfiguration?: IHttpConfiguration,
  ): Promise<T> {
    const config = {
      headers: { ...this.headers, ...httpConfiguration?.headers },
      body: JSON.stringify(httpConfiguration?.body),
    };

    let promise: Promise<any> = Promise.resolve(config);

    promise = promise.then((args) =>
      this.interceptors.request.execute(args),
    );

    promise = promise.then((args) =>
      fetch(`${this.baseURL}${path}`, {
        method: httpConfiguration?.method || EHttpMethods.GET,
        ...args,
      }).then(this.validateResponse),
    );

    promise = promise.then((args) =>
      this.interceptors.response.execute(args),
    );

    promise = promise
      .then(this.handleAsText)
      .then(this.responseAsJSON);

    return promise;
  }

  create(configuration: IFetchConfiguration): FetchWrapper {
    this.baseURL = configuration.baseURL;
    this.headers = configuration.headers;
    return FetchWrapper.instance;
  }

  get<T>(path: string, httpOptions?: IHttpOptions): Promise<T> {
    return this.fetchWrapper(path, {
      method: EHttpMethods.GET,
      ...httpOptions,
    });
  }

  post<T>(path: string, httpOptions?: IHttpOptions): Promise<T> {
    return this.fetchWrapper(path, {
      method: EHttpMethods.POST,
      ...httpOptions,
    });
  }

  put<T>(path: string, httpOptions?: IHttpOptions): Promise<T> {
    return this.fetchWrapper(path, {
      method: EHttpMethods.PUT,
      ...httpOptions,
    });
  }

  delete<T>(path: string, httpOptions?: IHttpOptions): Promise<T> {
    return this.fetchWrapper(path, {
      method: EHttpMethods.DELETE,
      ...httpOptions,
    });
  }
}
