import axios, { AxiosInstance, AxiosRequestConfig, Method } from 'axios';

type Headers = Record<string, string>;

interface RequestOptions {
  token?: string;
  headers?: Headers;
}

class ApiClient {
  private axios: AxiosInstance;

  constructor(baseURL: string) {
    this.axios = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  private async request<T>(
    method: Method,
    url: string,
    data?: any,
    options: RequestOptions = {}
  ): Promise<T> {
    const { token, headers } = options;

    const config: AxiosRequestConfig = {
      url,
      method,
      data,
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
    };

    try {
      const response = await this.axios.request<T>(config);
      return response.data;
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        'Unknown API error';

      throw new Error(`API Error (${error.response?.status || 'unknown'}): ${message}`);
    }
  }

  public get<T>(url: string, options?: RequestOptions): Promise<T> {
    return this.request<T>('GET', url, undefined, options);
  }

  public post<T>(url: string, data?: any, options?: RequestOptions): Promise<T> {
    return this.request<T>('POST', url, data, options);
  }

  public put<T>(url: string, data?: any, options?: RequestOptions): Promise<T> {
    return this.request<T>('PUT', url, data, options);
  }

  public patch<T>(url: string, data?: any, options?: RequestOptions): Promise<T> {
    return this.request<T>('PATCH', url, data, options);
  }

  public delete<T>(url: string, options?: RequestOptions): Promise<T> {
    return this.request<T>('DELETE', url, undefined, options);
  }
}

// 🧠 You can safely reuse `api` anywhere
export const api = new ApiClient(process.env.NEXT_PUBLIC_API_BASE_URL || '');
