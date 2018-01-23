import { Action } from '@ngrx/store';

export const TODO_ADD_ACTION = '[Todo] Add';
export class TodoAddAction implements Action {
  type = TODO_ADD_ACTION;
  constructor(public description: string, public dueDate: number) {}
}
export const TODO_ADD_SUCCESS_ACTION = '[Todo] Add Success';
export class TodoAddSuccessAction implements Action {
  type = TODO_ADD_SUCCESS_ACTION;
}
export const TODO_ADD_FAIL_ACTION = '[Todo] Add Fail';
export class TodoAddFailAction implements Action {
  type = TODO_ADD_FAIL_ACTION;
  constructor(public error: any) {}
}

export type TodoAddActions
 = TodoAddAction
 | TodoAddSuccessAction
 | TodoAddFailAction;
