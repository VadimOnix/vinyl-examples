import {RestDataProvider} from "@/shared/providers/RestDataProvider/RestDataProvider";
import {
  AuthenticateRepositoryConfiguration,
  InitialConfiguration,
  LoginRequestBody,
  LoginResponse,
  User
} from "./types";
import {IRestDataProvider} from "@/shared/providers/RestDataProvider/types";
import {LocalStorageDataProvider} from "@/shared/providers/LocalStorageDataProvider/LocalStorageDataProvider";
import {NextRequest} from "next/server";

export class AuthenticateRepository {
  private readonly restDataProvider: IRestDataProvider;
  private readonly localStorageDataProvider: LocalStorageDataProvider;

  constructor(initialConfiguration?: InitialConfiguration, dataProvider?: IRestDataProvider) {
    if (dataProvider) {
      this.restDataProvider = dataProvider;
    } else {
      this.restDataProvider = new RestDataProvider({
        initialHeaders: initialConfiguration?.headers
      });
    }
    // no need external configuration
    this.localStorageDataProvider = new LocalStorageDataProvider();
  }

  /**
   * Updates the configuration of the repository.
   * @param config - The configuration object.
   */
  public updateConfiguration(config: AuthenticateRepositoryConfiguration) {
    const {token, headers} = config;
    this.restDataProvider.updateHeaders({...headers, Authorization: `Bearer ${token}`});
  }

  /**
   * Logs in a user with the provided authentication information.
   * @param authInfo - The authentication information.
   * @returns The logged in user.
   */
  async login(authInfo: LoginRequestBody): Promise<LoginResponse> {
    const response = await this.restDataProvider.post<LoginResponse>('/auth/login', authInfo);
    const user = {
      ...response,
      id: response?.id ?? 15
    };
    return user;
  }

  /**
   * Retrieves the user information for the provided token.
   * @param token - The user token.
   * @returns The user information.
   */
  async me(token: string): Promise<User> {
    const response = await this.restDataProvider.post<LoginResponse>('/auth/login', {token});
    const user = {
      ...response,
      id: response?.id ?? 15
    };
    return user;
  }

  getTokenFromLocalStorage(): string | null {
    return this.localStorageDataProvider.getItem('token');
  }

  setTokenToLocalStorage(token: string): void {
    this.localStorageDataProvider.setItem('token', token);
  }

  getTokenFromCookies(cookies: Partial<{ [p: string]: string }> | undefined): string | null {
    const token = cookies?.['token'];
    return token ?? null;
  }

  setTokenToCookies(token: string, req: NextRequest): void {
    req.cookies.set('token', token)
  }
}
