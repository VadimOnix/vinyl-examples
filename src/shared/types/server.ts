export type ResponseData<T> = {
  data?: T,
  errors?: {
    message: string
  }[]
}

export type User = {
  id: number,
  login: string,
  password: string
}

export type LoginResponse = {
  token: string
}

export type MeResponse = Omit<User, 'password'>

export type TokenPayload = {
  id: number,
  iat: number,
  exp: number
}

export type ToDo = {
  id: number
  title: string
  description: string
  completed: boolean
  userId: number
}
