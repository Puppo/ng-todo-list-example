import { createAction, props } from '@ngrx/store';
import { ITodoDeleteActionProps, ITodoDeleteFailActionProps } from './todo-delete.actions.model';

export const TODO_DELETE_ACTION = '[Todo] Delete';
export const todoDeleteAction = createAction(TODO_DELETE_ACTION, props<ITodoDeleteActionProps>());

export const TODO_DELETE_SUCCESS_ACTION = '[Todo] Delete Success';
export const todoDeleteSuccessAction = createAction(TODO_DELETE_SUCCESS_ACTION);

export const TODO_DELETE_FAIL_ACTION = '[Todo] Delete Fail';
export const todoDeleteFailAction = createAction(TODO_DELETE_FAIL_ACTION, props<ITodoDeleteFailActionProps>());
