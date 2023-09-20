import {Headers} from "@/shared/providers/RestDataProvider/types";

export type InitialConfiguration = {
  headers: Headers
}
export type AuthenticateRepositoryConfiguration = {
  token: string,
  headers: Headers
}

export type LoginRequestBody = {
  username: string,
  password: string,
}

export type LoginResponse = {
  id?: number,
  username: string,
  email: string,
  firstName: string,
  lastName: string,
  gender: string,
  image: string
  token: string
}

export type User = LoginResponse & {
  id: number
}
