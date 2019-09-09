import { ITodoAddActionProps, ITodoAddFailActionProps } from './todo-add.actions.model';
import { createAction, props } from '@ngrx/store';

export const TODO_ADD_ACTION = '[Todo] Add';
export const todoAddAction = createAction(TODO_ADD_ACTION, props<ITodoAddActionProps>());

export const TODO_ADD_SUCCESS_ACTION = '[Todo] Add Success';
export const todoAddSuccessAction = createAction(TODO_ADD_SUCCESS_ACTION);

export const TODO_ADD_FAIL_ACTION = '[Todo] Add Fail';
export const todoAddFailAction = createAction(TODO_ADD_FAIL_ACTION, props<ITodoAddFailActionProps>());
