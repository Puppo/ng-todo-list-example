import * as fromActions from '../actions/todo-list.actions';

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

export function reducers(
  state = INIT_TODO_LIST_STATE,
  action: fromActions.TodoListActions
): ITodoListState {
  switch (action.type) {
    case fromActions.TODO_LIST_ACTION:
      return handleList(state, action);
    case fromActions.TODO_LIST_SUCCESS_ACTION:
      return handleListSuccess(
        state,
        action as fromActions.TodoListSuccessAction
      );
    case fromActions.TODO_LIST_FAIL_ACTION:
      return handleListFail(state, action as fromActions.TodoListFailAction);
    default:
      return state;
  }
}

function handleList(
  state: ITodoListState,
  action: fromActions.TodoListAction
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
  action: fromActions.TodoListSuccessAction
): ITodoListState {
  const loading = false;
  const { todos } = action;
  return {
    ...state,
    loading,
    todos
  };
}
function handleListFail(
  state: ITodoListState,
  action: fromActions.TodoListFailAction
): ITodoListState {
  const loading = false;
  const error = null;
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
