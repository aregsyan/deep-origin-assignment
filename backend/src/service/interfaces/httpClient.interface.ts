import { AxiosRequestHeaders } from 'axios';

export interface HttpClient {
  get<T>(requestObject: {
    url: string;
    headers?: AxiosRequestHeaders & Record<string, unknown>;
    params?: Record<string, unknown>;
  }): Promise<T>;
}
