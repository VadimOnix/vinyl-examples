import {AuthenticateRepositoryConfiguration} from "@/shared/repositories/Authenticate/types";
import {AuthenticateRepository} from "@/shared/repositories/Authenticate/AuthenticateRepository";

export type AuthServiceConfiguration = {
  authRepositoryConfiguration: AuthenticateRepositoryConfiguration
}
export type AuthServiceRepositories = {
  authRepository?: AuthenticateRepository
}
