import { ITodoListFailActionProps, ITodoListSuccessActionProps } from './todo-list.actions.model';
import { createAction, props } from '@ngrx/store';

export const TODO_LIST_ACTION = '[Todo] List';
export const todoListAction = createAction(TODO_LIST_ACTION);

export const TODO_LIST_SUCCESS_ACTION = '[Todo] List Success';
export const todoListSuccessAction = createAction(TODO_LIST_SUCCESS_ACTION, props<ITodoListSuccessActionProps>());

export const TODO_LIST_FAIL_ACTION = '[Todo] List Fail';
export const todoListFailAction = createAction(TODO_LIST_FAIL_ACTION, props<ITodoListFailActionProps>());
