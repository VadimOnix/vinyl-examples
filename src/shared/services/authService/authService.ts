import {AuthenticateRepository} from "@/shared/repositories/Authenticate/AuthenticateRepository";
import {AuthServiceConfiguration, AuthServiceRepositories} from "./types";
import {GetServerSidePropsContext} from "next";
import {LoginResponse} from "@/shared/types/server";
import {LoginRequestBody} from "@/shared/repositories/Authenticate/types";

export class AuthService {
  private authenticateRepository: AuthenticateRepository;

  constructor(serviceConfiguration?: AuthServiceConfiguration, repositories?: AuthServiceRepositories) {
    if (repositories?.authRepository) {
      this.authenticateRepository = repositories.authRepository;
    } else {
      this.authenticateRepository = new AuthenticateRepository(serviceConfiguration?.authRepositoryConfiguration);
    }
  }

  updateRepositoriesConfiguration(config: AuthServiceConfiguration) {
    this.authenticateRepository.updateConfiguration(config.authRepositoryConfiguration);
  }

  public getToken(ctx?: GetServerSidePropsContext): string | null {
    if (typeof window === 'undefined') {
      return this.authenticateRepository.getTokenFromCookies(ctx?.req.cookies)
    }
    return this.authenticateRepository.getTokenFromLocalStorage();
  }

  public getUser() {
    if (typeof window === 'undefined') {
      throw Error("You can't get user from server side");
    }
    return this.authenticateRepository.getUserFromLocalStorage();
  }

  public async login(authInfo: LoginRequestBody): Promise<LoginResponse> {
    const user = await this.authenticateRepository.login(authInfo);
    this.authenticateRepository.setTokenToLocalStorage(user.token)
    this.authenticateRepository.setUserToLocalStorage(user)
    this.authenticateRepository.updateConfiguration({token: user.token})
    return user
  }
}
