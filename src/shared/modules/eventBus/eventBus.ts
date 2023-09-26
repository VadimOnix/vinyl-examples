import {withTimeout} from './helpers';
import type {DefaultListener, ListenerSignature} from 'tiny-typed-emitter';
import {TypedEmitter} from 'tiny-typed-emitter';
import {InvokeParams, RPCEventCallbackMap} from "./types";

export class EventBus<L extends ListenerSignature<L> = DefaultListener> extends TypedEmitter<L> {
  private static _instance: EventBus;
  private readonly _subscriptions: Partial<Record<keyof RPCEventCallbackMap, RPCEventCallbackMap[keyof RPCEventCallbackMap]>>;

  private constructor() {
    super();

    if (EventBus._instance) {
      throw new Error('EventBus статический класс.\n Используй "EventBus.instance" вместо new EventBus()');
    }

    EventBus._instance = this;
    this._subscriptions = {};
  }

  public static getInstance<L extends ListenerSignature<L>>(): EventBus<L> {
    EventBus._instance = EventBus._instance ?? new EventBus();

    return EventBus._instance as EventBus<L>;
  }

  public register<E extends keyof RPCEventCallbackMap>(event: E, callback: RPCEventCallbackMap[E]) {
    if (Object.hasOwn(this._subscriptions, event)) {
      console.warn('Такое событие уже зарегистрировано, callback будет перезаписан');
    }

    this._subscriptions[event] = callback;

    return () => {
      this.unregister(event);
    };
  }

  public unregister<E extends keyof RPCEventCallbackMap>(event: E) {
    delete this._subscriptions[event];
  }

  public invoke<E extends keyof RPCEventCallbackMap>(params: InvokeParams<E>) {
    const {event, arg, timeout = 3000, isThrowable = false} = params;

    try {
      if (!this._subscriptions[event]) {
        throw Error(`Событие "${event}" не зарегистрировано`);
      }

      const callback = this._subscriptions[event];

      return withTimeout<Awaited<ReturnType<RPCEventCallbackMap[E]>>>(
        // @ts-ignore
        () => (arg ? callback(arg) : callback()),
        timeout,
      );
    } catch (e) {
      if (!isThrowable) {
        console.error((e as Error).message);

        return null;
      } else {
        throw e;
      }
    }
  }
}
