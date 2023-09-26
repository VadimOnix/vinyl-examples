import type {ComponentType, Context, NamedExoticComponent} from 'react';
import {createContext, memo, useContext, useState} from 'react';
import {useLifecycles} from 'react-use';
import {BaseViewController} from "@/shared/modules/controller/controller";

interface WidgetExoticComponent<P> extends NamedExoticComponent<P> {
  widgetName: string
}

export const createWidgetContext = <
  ViewController extends BaseViewController,
  WidgetName extends string,
  ContextType extends ViewController = ViewController,
>(
  widgetName: WidgetName,
) => {
  const Context = createContext<ContextType>(undefined as unknown as ContextType)

  Context.displayName = `${String(widgetName)}.WidgetContext`;
  // @ts-ignore
  Context.widgetName = widgetName;
  return Context;
};

export const createWidgetContextHook = <
  ViewController extends BaseViewController,
  ContextType extends ViewController = ViewController,
>(
  context: Context<ContextType>,
) => {
  return () => {
    return useContext(context);
  };
};

const createWidgetContainerComponentWrapper = <
  ViewController extends BaseViewController,
  ContextType extends ViewController = ViewController,
>(
  WidgetContext: Context<ContextType>,
) => {
  return function <HydrationData>(createControllersFn: (hydrationData?: HydrationData) => ContextType) {
    return function <P extends { hydrationData?: HydrationData }>(Component: ComponentType<P>) {
      const WidgetContainerWrapper = (props: P) => {
        const {hydrationData} = props;
        const [viewController] = useState(createControllersFn(hydrationData));

        useLifecycles(
          () => {
            void viewController.init();
          },
          () => {
            void viewController.dispose();
          },
        );

        return (
          <WidgetContext.Provider value={viewController}>
            <Component {...props} />
          </WidgetContext.Provider>
        );
      };
      return memo(WidgetContainerWrapper) as unknown as WidgetExoticComponent<P>;
    };
  }
};

export const getWidgetWrapper = <WidgetName extends string, ViewController extends BaseViewController>(
  widgetName: WidgetName,
) => {
  const Context = createWidgetContext<ViewController, WidgetName>(widgetName);
  const Hook = createWidgetContextHook<ViewController>(Context);
  const HOC = createWidgetContainerComponentWrapper<ViewController>(Context)

  return {
    HOC,
    Hook,
  };
};
