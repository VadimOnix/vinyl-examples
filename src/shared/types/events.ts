export const enum GlobalEvents {
  AUTHENTICATION_WAS_SUCCESS = 'authenticateWasSuccess',
}

export type Events = {
  [GlobalEvents.AUTHENTICATION_WAS_SUCCESS]: (args: { token: string }) => void
}

export type Reaction = {
  key: keyof Events;
  callback: Events[keyof Events];
};
