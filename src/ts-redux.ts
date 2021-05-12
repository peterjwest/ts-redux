import * as React from 'react';
import { connect as reduxConnect, Matching, GetProps } from 'react-redux';
import { Dispatch, Action, AnyAction } from 'redux';

export interface DispatchProps<Actions extends Action> {
  dispatch: Dispatch<Actions>;
}

export interface FunctionAction<Store> extends AnyAction {
  type: (store: Store) => Store;
}

export type ActionProps<Store> = DispatchProps<FunctionAction<Store>>;

export function connect<
  Store,
  ComponentClass extends React.ComponentClass<
    Matching<StoreProps & DispatchProps<Actions>, GetProps<ComponentClass>>,
    State
  >,
  StoreProps,
  ComponentProps,
  State,
  Actions extends Action,
>
(component: ComponentClass, mapStoreProps: (state: Store, ownProps: ComponentProps) => StoreProps) {
  return reduxConnect<StoreProps, DispatchProps<Actions>, ComponentProps, Store>(
    mapStoreProps,
    (dispatch: Dispatch<Actions>): DispatchProps<Actions> => ({ dispatch: dispatch }),
  )(component);
}

export function action<Store>(baseAction: (store: Store) => Store): FunctionAction<Store> {
  return { type: baseAction };
}

export function createReducer<Store>(defaultStore: Store) {
  return (store = defaultStore, action: AnyAction | { type: FunctionAction<Store> }): Store => {
    return typeof action.type === 'function' ? action.type(store) : store;
  };
}
