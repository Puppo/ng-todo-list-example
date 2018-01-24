import { Action } from '@ngrx/store';

export const TODO_DELETE_ACTION = '[Todo] Delete';
export class TodoDeleteAction implements Action {
  type = TODO_DELETE_ACTION;
  constructor(public id: number) {}
}
export const TODO_DELETE_SUCCESS_ACTION = '[Todo] Delete Success';
export class TodoDeleteSuccessAction implements Action {
  type = TODO_DELETE_SUCCESS_ACTION;
}
export const TODO_DELETE_FAIL_ACTION = '[Todo] Delete Fail';
export class TodoDeleteFailAction implements Action {
  type = TODO_DELETE_FAIL_ACTION;
  constructor(public error: any) {}
}

export type TodoDeleteActions =
  TodoDeleteAction
  | TodoDeleteSuccessAction
  | TodoDeleteAction;
