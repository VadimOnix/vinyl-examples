export type ArrayElement<ArrayType extends readonly unknown[]> = ArrayType extends readonly (infer ElementType)[]
  ? ElementType
  : never;

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export enum RPCEvent {}

export interface RPCEventCallbackMap extends Record<RPCEvent, (...args: unknown[]) => unknown> {
}

export type InvokeParams<E extends keyof RPCEventCallbackMap> = ArrayElement<
  Parameters<RPCEventCallbackMap[E]>
> extends never
  ? InvokeParamsWithOptionalArg<E>
  : InvokeParamsWithNonOptionalArg<E>;

interface InvokeParamsWithNonOptionalArg<E extends keyof RPCEventCallbackMap> {
  event: E;
  arg: ArrayElement<Parameters<RPCEventCallbackMap[E]>>;
  timeout?: number;
  isThrowable?: boolean;
}

type InvokeParamsWithOptionalArg<E extends keyof RPCEventCallbackMap> = PartialBy<
  InvokeParamsWithNonOptionalArg<E>,
  'arg'
>;
