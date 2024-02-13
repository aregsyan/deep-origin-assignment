import { injectable } from 'inversify';
import { HttpClient } from './interfaces/httpClient.interface';
import axios from 'axios';
import {
  AxiosRequestHeaders,
  AxiosResponse,
  Method,
  ResponseType,
  AxiosRequestConfig,
} from 'axios';

@injectable()
export class AxiosHttpClient implements HttpClient {
  public async get<T>({
    url,
    headers,
    params,
  }: {
    url: string;
    headers: AxiosRequestHeaders;
    params?: Record<string, unknown>;
  }): Promise<T> {
    const axiosConfig = {
      method: 'GET' as Method,
      headers: { ...headers },
      url,
      params,
      responseType: 'json' as ResponseType,
    };
    const response = await this.sendRequest<T>(axiosConfig);
    return response.data;
  }

  private sendRequest<T>(
    axiosConfig: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    try {
      return axios.request(axiosConfig);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
