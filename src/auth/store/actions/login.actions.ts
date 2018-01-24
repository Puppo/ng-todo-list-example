import { Action } from '@ngrx/store';

export const LOGIN_ACTION = '[Auth] Login';
export class LoginAction implements Action {
  readonly type = LOGIN_ACTION;
  constructor(public email: string, public password: string) {}
}
export const LOGIN_SUCCESS_ACTION = '[Auth] Login Success';
export class LoginSuccessAction implements Action {
  readonly type = LOGIN_SUCCESS_ACTION;
  constructor(public token: string, public email: string) {}
}
export const LOGIN_FAIL_ACTION = '[Auth] Login Fail';
export class LoginFailAction implements Action {
  readonly type = LOGIN_FAIL_ACTION;
  constructor(public error: any) {}
}

export const LOGOUT_ACTION = '[Auth] Logout';
export class LogoutAction implements Action {
  readonly type = LOGOUT_ACTION;
}

export type LoginActions =
  | LoginAction
  | LoginSuccessAction
  | LoginFailAction
  | LogoutAction;
