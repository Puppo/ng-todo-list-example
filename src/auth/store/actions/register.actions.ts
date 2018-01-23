import { Action } from '@ngrx/store';

export const REGISTER_ACTION = '[Auth] Register';
export class RegisterAction implements Action {
  readonly type = REGISTER_ACTION;
  constructor(public email: string, public password: string) {}
}
export const REGISTER_SUCCESS_ACTION = '[Auth] Register Success';
export class RegisterSuccessAction implements Action {
  readonly type = REGISTER_SUCCESS_ACTION;
}
export const REGISTER_FAIL_ACTION = '[Auth] Register Fail';
export class RegisterFailAction implements Action {
  readonly type = REGISTER_FAIL_ACTION;
  constructor(public error: any) {}
}

export type RegisterActions =
  | RegisterAction
  | RegisterSuccessAction
  | RegisterFailAction;
