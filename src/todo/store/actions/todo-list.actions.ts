import { Action } from '@ngrx/store';

import { ITodo } from '../../shared/models';

export const TODO_LIST_ACTION = '[Todo] List';
export class TodoListAction implements Action {
  type = TODO_LIST_ACTION;
}
export const TODO_LIST_SUCCESS_ACTION = '[Todo] List Success';
export class TodoListSuccessAction implements Action {
  type = TODO_LIST_SUCCESS_ACTION;
  constructor(public todos: ITodo[]) {}
}
export const TODO_LIST_FAIL_ACTION = '[Todo] List Fail';
export class TodoListFailAction implements Action {
  type = TODO_LIST_FAIL_ACTION;
  constructor(public error: any) {}
}

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

export type TodoListActions =
  | TodoListAction
  | TodoListSuccessAction
  | TodoListFailAction
  | TodoDeleteAction
  | TodoDeleteSuccessAction
  | TodoDeleteAction;
