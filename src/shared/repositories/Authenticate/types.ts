import {Headers} from "@/shared/providers/RestDataProvider/types";
import {User} from "@/shared/types/server";

export type InitialConfiguration = {
  headers?: Headers
}
export type AuthenticateRepositoryConfiguration = {
  token: string,
  headers?: Headers
}

export type LoginRequestBody = Omit<User, 'id'>
