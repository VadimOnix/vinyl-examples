import type {CreateObservableOptions} from 'mobx';
import {$mobx, isObservable, makeObservable} from 'mobx';

const annotationsSymbol = Symbol('annotationsSymbol');
const objectPrototype = Object.prototype;

export type Overrides<T extends object = object> = Partial<Record<keyof T, boolean>>;


export function makeClassAutoObservable<T extends object>(
  target: T,
  overrides?: Overrides<T>,
  options?: CreateObservableOptions,
): T {
  if (isObservable(target)) {
    throw new Error('Target must not be observable');
  }

  // @ts-ignore
  let annotations = target[annotationsSymbol] as unknown as T;

  if (!annotations) {
    annotations = {} as T;
    let current = target;

    while (current && current !== objectPrototype) {
      Reflect.ownKeys(current).forEach((key) => {
        if (key === $mobx || key === 'constructor') {
          return;
        }

        // @ts-ignore
        annotations[key] = !overrides ? true : key in overrides ? overrides[key] : true;
      });

      current = Object.getPrototypeOf(current) as unknown as T;
    }

    const proto = Object.getPrototypeOf(target);


    if (proto && proto !== objectPrototype) {
      Object.defineProperty(proto, annotationsSymbol, {value: annotations});
    }
  }

  return makeObservable(target, annotations, options);
}

