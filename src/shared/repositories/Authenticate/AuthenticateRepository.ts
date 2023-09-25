import {RestDataProvider} from "@/shared/providers/RestDataProvider/RestDataProvider";
import {AuthenticateRepositoryConfiguration, InitialConfiguration, LoginRequestBody,} from "./types";
import {IRestDataProvider} from "@/shared/providers/RestDataProvider/types";
import {LocalStorageDataProvider} from "@/shared/providers/LocalStorageDataProvider/LocalStorageDataProvider";
import {LoginResponse, MeResponse, ResponseData, User} from "@/shared/types/server";

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
    try {
      const response = await this.restDataProvider.post<ResponseData<LoginResponse>>('/profile/login', authInfo);
      if (response?.errors) {
        throw new Error(response?.errors.join('\n'));
      }
      return response.data!
    } catch (error) {
      console.error((error as Error).message)
      throw error
    }
  }

  /**
   * Retrieves the user information for the provided token.
   * @returns The user information.
   */
  async me(): Promise<MeResponse> {
    const response = await this.restDataProvider.post<ResponseData<MeResponse>>('/profile/me', {});
    return response.data!;
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

  setUserToLocalStorage(user: LoginResponse): void {
    this.localStorageDataProvider.setItem('user', user)
  }

  getUserFromLocalStorage(): User | null {
    const user = this.localStorageDataProvider.getItem('user');
    return user
  }
}
