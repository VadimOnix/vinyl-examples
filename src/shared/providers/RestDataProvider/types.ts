export type ConstructorParams = {
  initialHeaders?: Record<string, string>,
  baseUrl?: string
}

export type Headers = Record<string, string>

export interface IRestDataProvider {
  get<Response>(url: string, headers?: Headers): Promise<Response>;

  post<Response, RequestBody = {}>(url: string, body: RequestBody, headers?: Headers): Promise<Response>;

  updateHeaders(headers: Headers): void;
}
