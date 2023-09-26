import React, {createContext, memo, useContext, useEffect, useState} from 'react';

const createPageHydrationDataContext = () => {
  const Context = createContext(undefined);
  Context.displayName = 'PageContext';
  return Context;
};

const createPageHydrationDataContextHook = (context) => {
  return (widgetName) => {
    const hydrationData = useContext(context);
    if (widgetName) {
      return hydrationData[widgetName] || hydrationData;
    }
    return hydrationData;
  };
};


const createHydrationWrapper = (HydrationContext) => {
  return function (Component) {
    const HydrationProviderWrapper = (props) => {
      const {hydrationData, ...restProps} = props;
      const [hydrationDataState, setHydrationDataState] = useState(hydrationData);
      useEffect(() => {
        setHydrationDataState(hydrationData);
      }, [hydrationData]);

      return (
        <HydrationContext.Provider value={hydrationDataState}>
          <Component {...restProps} />
        </HydrationContext.Provider>
      );
    };

    return memo(HydrationProviderWrapper);
  };
};
const createHydrationWidgetWrapper = (usePageHydrationData) => {
  return function (Component) {
    const WidgetWithHydrationData = (props) => {
      const widgetName = Component.widgetName
      const hydrationData = usePageHydrationData(widgetName)

      return (
        <Component {...props} hydrationData={hydrationData}/>
      )
    };
    return memo(WidgetWithHydrationData);
  };
};


export const createHydrateInjector = () => {
  const HydrationContext = createPageHydrationDataContext();
  const usePageHydrationData = createPageHydrationDataContextHook(HydrationContext);

  const withPageHydration = createHydrationWrapper(HydrationContext);
  const withWidgetHydration = createHydrationWidgetWrapper(usePageHydrationData)

  return {
    HydrationContext,
    withPageHydration,
    withWidgetHydration,
  };
};
