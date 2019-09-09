import { createReducer, on, Action } from '@ngrx/store';
import * as fromActions from '../actions/todo-list.actions';
import * as fromProps from '../actions/todo-list.actions.model';

import { ITodo } from '../../shared/models';

export interface ITodoListState {
  loading: boolean;
  error: any;
  todos: ITodo[];
}

export const INIT_TODO_LIST_STATE: ITodoListState = {
  loading: false,
  error: null,
  todos: null
};

const featureReducer = createReducer(
  INIT_TODO_LIST_STATE,
  on(fromActions.todoListAction, handleList),
  on(fromActions.todoListSuccessAction, handleListSuccess),
  on(fromActions.todoListFailAction, handleListFail)
);

function handleList(
  state: ITodoListState
): ITodoListState {
  const loading = true;
  const error = null;
  const todos = null;
  return {
    ...state,
    loading,
    error,
    todos
  };
}
function handleListSuccess(
  state: ITodoListState,
  payload: fromProps.ITodoListSuccessActionProps
): ITodoListState {
  const loading = false;
  const { todos } = payload;
  return {
    ...state,
    loading,
    todos
  };
}
function handleListFail(
  state: ITodoListState,
  payload: fromProps.ITodoListFailActionProps
): ITodoListState {
  const loading = false;
  const {error} = payload;
  return {
    ...state,
    loading,
    error
  };
}

export function getTodoListLoading(state: ITodoListState): boolean {
  return state.loading;
}
export function getTodoListTodos(state: ITodoListState): ITodo[] {
  return state.todos;
}
export function getTodoListError(state: ITodoListState): any {
  return state.error;
}


export function reducer(state: ITodoListState | undefined, action: Action) {
  return featureReducer(state, action);
}
