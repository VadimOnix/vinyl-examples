import {getWidgetWrapper} from "@/shared/modules/widget/getWidgetWrapper";
import {AuthButtonViewController} from "@/domains/authenticate/widgets/authButton/viewController/viewController";

const wrapper = getWidgetWrapper<'authButton', AuthButtonViewController>('authButton');

export const withWidgetControllers = wrapper.HOC;
export const useViewController = wrapper.Hook;
