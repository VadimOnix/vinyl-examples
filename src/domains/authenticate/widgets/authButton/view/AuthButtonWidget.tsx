import {AuthButtonClient} from "@/domains/authenticate/widgets/authButton/view/AuthButton.client";
import {withWidgetControllers} from "@/domains/authenticate/widgets/authButton/DI/DI";
import {createAuthButtonController} from "@/domains/authenticate/widgets/authButton/DI/createAuthButtonController";

const AuthButtonComponent = () => {
  return (<AuthButtonClient/>)
}

export const AuthButtonWidget = withWidgetControllers(createAuthButtonController)(AuthButtonComponent);
AuthButtonWidget.widgetName = 'authButton';
