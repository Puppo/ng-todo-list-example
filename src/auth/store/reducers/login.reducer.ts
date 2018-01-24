import { Action } from '@ngrx/store';

import * as fromActions from '../actions';

export interface ILoginState {
  email: string;
  token: string;
  loading: boolean;
  error: any;
}

export const INIT_LOGIN_STATE: ILoginState = {
  email: null,
  token: null,
  loading: false,
  error: null,
};

export function reducer(
  state = INIT_LOGIN_STATE,
  action: fromActions.LoginActions
): ILoginState {
  switch (action.type) {
    case fromActions.LOGIN_ACTION:
      return handleLogin(state, action);
    case fromActions.LOGIN_SUCCESS_ACTION:
      return handleLoginSuccess(state, action);
    case fromActions.LOGIN_FAIL_ACTION:
      return handleLoginFail(state, action);
    case fromActions.LOGOUT_ACTION:
      return handleLogout(state, action);

    default:
      return state;
  }
}

function handleLogin(
  state: ILoginState,
  action: fromActions.LoginAction
): ILoginState {
  const email = null;
  const token = null;
  const loading = true;
  const error = null;
  return {
    ...state,
    email,
    token,
    loading,
    error
  };
}

function handleLoginSuccess(
  state: ILoginState,
  action: fromActions.LoginSuccessAction
): ILoginState {
  const { email, token } = action;
  const loading = false;
  return {
    ...state,
    email,
    token,
    loading
  };
}

function handleLoginFail(
  state: ILoginState,
  action: fromActions.LoginFailAction
): ILoginState {
  const email = null;
  const token = null;
  const loading = false;
  const { error } = action;
  return {
    ...state,
    email,
    token,
    loading,
    error
  };
}

function handleLogout(
  state: ILoginState,
  action: fromActions.LogoutAction
): ILoginState {
  const email = null;
  const token = null;
  const loading = false;
  const error = null;
  return {
    ...state,
    email,
    token,
    loading,
    error
  };
}

export function getLoginEmail(state: ILoginState): string {
  return state.email;
}
export function getLoginToken(state: ILoginState): string {
  return state.token;
}
export function getLoginLoading(state: ILoginState): boolean {
  return state.loading;
}
export function getLoginError(state: ILoginState): boolean {
  return state.error;
}
