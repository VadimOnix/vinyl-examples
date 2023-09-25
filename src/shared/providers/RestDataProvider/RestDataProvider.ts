import {ENV} from "@/configs/env/env";
import {ConstructorParams, Headers, IRestDataProvider} from "./types";

/**
 * Provides methods to make REST API requests.
 */
export class RestDataProvider implements IRestDataProvider {
  private headers: Headers;
  private readonly baseUrl: string;

  constructor({initialHeaders, baseUrl}: ConstructorParams) {
    // we want to use only application/json by default
    this.headers = {
      'Content-Type': 'application/json',
      ...initialHeaders
    };
    if (baseUrl && !this.isValidUrl(baseUrl)) {
      throw new Error('Invalid baseUrl');
    }
    this.baseUrl = baseUrl ?? ENV('NEXT_PUBLIC_API_URL');
  }

  async get<Response>(url: string, headers?: Headers): Promise<Response> {
    const response = await fetch(`${this.baseUrl}${url}`, {
      headers: {
        ...this.headers,
        ...headers,
      },
      method: 'GET',
    })
    const data = await response.json();
    return data;
  }

  async post<Response, RequestBody = {}>(url: string, body: RequestBody, headers?: Headers): Promise<Response> {
    const response = await fetch(`${this.baseUrl}${url}`, {
      headers: {
        ...this.headers,
        ...headers,
      },
      method: 'POST',
      body: typeof body === 'string' ? body : JSON.stringify(body),
    });
    const data = await response.json();
    return data;
  }

  public updateHeaders(headers: Headers): void {
    this.headers = {
      ...this.headers,
      ...headers
    }
  }

  private isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  }
}
