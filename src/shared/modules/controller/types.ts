export interface IController {
  init(): void | Promise<void>;

  dispose(): void;
}

export interface IDataController<HydrationData> extends IController {
  hydrate(hydrationData?: HydrationData): void;
}


export type ViewControllerDeps<DC extends IController = IController> = {
  dataController: DC;
}
