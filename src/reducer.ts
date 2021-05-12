import { action, createReducer } from './ts-redux';

export interface Store {
  name: string;
}

export const defaultStore: Store = {
  name: 'Nobody',
};

export default createReducer(defaultStore);

export const actions = {
  updateName: (name: string) => action((store: Store): Store => {
    return { ...store, name };
  }),
};
