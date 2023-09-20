import {AuthenticateRepository} from "@/shared/repositories/Authenticate/AuthenticateRepository";
import {AuthServiceConfiguration, AuthServiceRepositories} from "./types";
import {GetServerSidePropsContext} from "next";
import {LoginRequestBody, LoginResponse} from "@/shared/repositories/Authenticate/types";

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
      const token = this.authenticateRepository.getTokenFromCookies(ctx?.req.cookies);
      return token
    }
    return this.authenticateRepository.getTokenFromLocalStorage();
  }

  public async login(authInfo: LoginRequestBody): Promise<LoginResponse> {
    const user = await this.authenticateRepository.login(authInfo);
    return user
  }
}
