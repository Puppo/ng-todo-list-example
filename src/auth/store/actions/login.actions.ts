import { createAction, props } from '@ngrx/store';
import { ILoginActionProps, ILoginSuccessActionProps, ILoginFailActionProps } from './login.actions.model';

export const LOGIN_ACTION = '[Auth] Login';
export const loginAction = createAction(LOGIN_ACTION, props<ILoginActionProps>());

export const LOGIN_SUCCESS_ACTION = '[Auth] Login Success';
export const loginSuccessAction = createAction(LOGIN_SUCCESS_ACTION, props<ILoginSuccessActionProps>());

export const LOGIN_FAIL_ACTION = '[Auth] Login Fail';
export const loginFailAction = createAction(LOGIN_FAIL_ACTION, props<ILoginFailActionProps>());

export const LOGOUT_ACTION = '[Auth] Logout';
export const logoutAction = createAction(LOGOUT_ACTION);
