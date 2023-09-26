import {getWidgetWrapper} from "@/shared/modules/widget/getWidgetWrapper";
import {ToDoListViewController} from "@/domains/toDo/widgets/toDoList/viewController/viewController";


const wrapper = getWidgetWrapper<'toDoList', ToDoListViewController>('toDoList');

export const withWidgetControllers = wrapper.HOC;
export const useViewController = wrapper.Hook;
