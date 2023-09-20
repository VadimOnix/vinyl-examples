import {Headers} from "@/shared/providers/RestDataProvider/types";

export type InitialConfiguration = {
  headers: Headers
}

export type TodoRepositoryConfiguration = {
  token: string,
  headers: Headers
}

export type AddToDoRequestBody = {
  todo: string,
  completed: boolean,
  userId: number,
}

export type ToDo = {
  id: number,
  todo: string,
  completed: boolean,
  userId: number
}
