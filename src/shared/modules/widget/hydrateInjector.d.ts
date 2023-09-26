import {Consumer, Context, FunctionComponent} from "react";

export type HydrateStruct<T> = {
  hydrationData: T
}

type HookProp = {
  useHydrationData: () => HydrateStruct<PageHydrationData>
}

export function createHydrateInjector<PageHydrationData>(): ({
  HydrationContext: Context<HydrateStruct<PageHydrationData>>,
  withHydrationWidget: (
    component: FunctionComponent<P & HookProp>,
    useHydrationData?: () => HydrateStruct<PageHydrationData>) => FunctionComponent<P & HookProp>,
  withPageHydration: (component: FunctonComponent<P & HydrateStruct<PageHydrationData>>) => Consumer<P>,
  withWidgetHydration: (component: FunctonComponent<P>) => FunctionComponent<P>,
})

export type WithHydrationProps<HydrationData, PageProps = {}> = HydrateStruct<HydrationData> & PageProps
