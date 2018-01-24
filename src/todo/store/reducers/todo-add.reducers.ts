import * as fromActions from '../actions/todo-add.actions';

export interface ITodoAddState {
  loading: boolean;
  error: any;
}

export const INIT_TODO_STATE: ITodoAddState = {
  loading: false,
  error: null
};

export function reducer(
  state = INIT_TODO_STATE,
  action: fromActions.TodoAddActions
): ITodoAddState {
  switch (action.type) {
    case fromActions.TODO_ADD_ACTION:
      return handleAdd(state, action as fromActions.TodoAddAction);
    case fromActions.TODO_ADD_SUCCESS_ACTION:
      return handleAddSuccess(state, action);
    case fromActions.TODO_ADD_FAIL_ACTION:
      return handleAddFail(state, action as fromActions.TodoAddFailAction);
    default:
      return state;
  }
}

function handleAdd(
  state: ITodoAddState,
  action: fromActions.TodoAddAction
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
  state: ITodoAddState,
  action: fromActions.TodoAddSuccessAction
): ITodoAddState {
  const loading = false;
  return {
    ...state,
    loading
  };
}

function handleAddFail(
  state: ITodoAddState,
  action: fromActions.TodoAddFailAction
): ITodoAddState {
  const loading = false;
  const { error } = action;
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
