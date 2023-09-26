import {Headers} from "@/shared/providers/RestDataProvider/types";

export type InitialConfiguration = {
  headers?: Headers
}

export type TodoRepositoryConfiguration = {
  token: string,
  headers?: Headers
}

export type AddToDoRequestBody = {
  title: string,
  description: string
  completed: boolean
}
