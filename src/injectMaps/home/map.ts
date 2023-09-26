import {ToDoListHydrationData} from "@/domains/toDo/widgets/toDoList/types/types";
import {createHydrateInjector} from "@/shared/modules/widget/hydrateInjector";
import {ToDoListWidget} from "@/domains/toDo/widgets/toDoList/view/ToDoListWidget";
import {AuthButtonWidget} from "@/domains/authenticate/widgets/authButton/view/AuthButtonWidget";

export type HydrationHomePageWidgetsData = {
  toDoList: ToDoListHydrationData
}
export const {withPageHydration, withWidgetHydration} = createHydrateInjector<HydrationHomePageWidgetsData>()
export const ToDoList = withWidgetHydration(ToDoListWidget)
export const AuthButton = AuthButtonWidget
