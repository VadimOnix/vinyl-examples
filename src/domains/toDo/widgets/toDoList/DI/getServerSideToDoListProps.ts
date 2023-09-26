import {ToDoService} from "@/domains/toDo/service/ToDoService";
import {ToDoListHydrationData} from "@/domains/toDo/widgets/toDoList/types/types";
import {GetServerSidePropsContext} from "next";

export const getServerSideToDoListProps = async (token: string | null, ctx: GetServerSidePropsContext): Promise<ToDoListHydrationData> => {
  try {
    if (!token) {
      throw Error('No token');
    }
    const toDoService = new ToDoService({
      toDoRepositoryConfiguration: {
        token,
        // @ts-ignore
        headers: ctx.req.headers
      }
    });

    const toDos = await toDoService.getToDos();
    return {
      toDos
    };
  } catch (error) {
    console.warn((error as Error).message)
    return {
      toDos: []
    };
  }
};
