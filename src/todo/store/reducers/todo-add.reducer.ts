import { ITodoAddFailActionProps } from './../actions/todo-add.actions.model';
import { createReducer, on, Action } from '@ngrx/store';
import * as fromActions from '../actions/todo-add.actions';

export interface ITodoAddState {
  loading: boolean;
  error: any;
}

export const INIT_TODO_ADD_STATE: ITodoAddState = {
  loading: false,
  error: null
};

const featureReducer = createReducer(
  INIT_TODO_ADD_STATE,
  on(fromActions.todoAddAction, handleAdd),
  on(fromActions.todoAddSuccessAction, handleAddSuccess),
  on(fromActions.todoAddFailAction, handleAddFail)
);

function handleAdd(
  state: ITodoAddState
): ITodoAddState {
  const loading = true;
  const error = null;
  return {
    ...state,
    loading,
    error
  };
}

function handleAddSuccess(
  state: ITodoAddState
): ITodoAddState {
  const loading = false;
  return {
    ...state,
    loading
  };
}

function handleAddFail(
  state: ITodoAddState,
  payload: ITodoAddFailActionProps
): ITodoAddState {
  const loading = false;
  const { error } = payload;
  return {
    ...state,
    loading,
    error
  };
}

export function getTodoAddLoading(state: ITodoAddState): boolean {
  return state.loading;
}

export function getTodoAddError(state: ITodoAddState): boolean {
  return state.error;
}

export function reducer(state: ITodoAddState | undefined, action: Action) {
  return featureReducer(state, action);
}
