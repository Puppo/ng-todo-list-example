import { createReducer, on, Action } from '@ngrx/store';
import * as fromActions from '../actions/todo-list.actions';
import * as fromProps from '../actions/todo-list.actions.model';

import { ITodo } from '../../shared/models';
import { Injectable } from '@angular/core';

export interface ITodoListState {
  loading: boolean;
  error: any;
  todos: ITodo[];
}

@Injectable()
export class TodoListReducerService {

  protected get initTodoListState(): ITodoListState {
    return {
      loading: false,
      error: null,
      todos: null
    };
  }

  protected get featureReducer() {
    return createReducer(
      this.initTodoListState,
      on(fromActions.todoListAction, this.handleList),
      on(fromActions.todoListSuccessAction, this.handleListSuccess),
      on(fromActions.todoListFailAction, this.handleListFail)
    );
  }

  reducer(state: ITodoListState | undefined, action: Action) {
    return this.featureReducer(state, action);
  }

  protected handleList(
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

  protected handleListSuccess(
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

  protected handleListFail(
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
