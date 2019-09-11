import { ITodoAddFailActionProps } from './../actions/todo-add.actions.model';
import { createReducer, on, Action } from '@ngrx/store';
import * as fromActions from '../actions/todo-add.actions';
import { Injectable } from '@angular/core';

export interface ITodoAddState {
  loading: boolean;
  error: any;
}

@Injectable()
export class TodoAddReducerService {

  protected get initTodoAddState(): ITodoAddState {
    return {
      loading: false,
      error: null
    };
  }

  protected get featureReducer() {
    return createReducer(
      this.initTodoAddState,
      on(fromActions.todoAddAction, this.handleAdd),
      on(fromActions.todoAddSuccessAction, this.handleAddSuccess),
      on(fromActions.todoAddFailAction, this.handleAddFail)
    );
  }

  reducer(state: ITodoAddState | undefined, action: Action): ITodoAddState {
    return this.featureReducer(state, action);
  }

  protected handleAdd(
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

  protected handleAddSuccess(
    state: ITodoAddState
  ): ITodoAddState {
    const loading = false;
    return {
      ...state,
      loading
    };
  }

  protected handleAddFail(
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

}

export function getTodoAddLoading(state: ITodoAddState): boolean {
  return state.loading;
}

export function getTodoAddError(state: ITodoAddState): boolean {
  return state.error;
}
