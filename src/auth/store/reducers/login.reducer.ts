import { ILoginActionProps } from './../actions/login.actions.model';
import * as fromActions from '../actions';
import { on, createReducer, Action } from '@ngrx/store';

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
  error: null
};

const featureReducer = createReducer(
  INIT_LOGIN_STATE,
  on(fromActions.loginAction, handleLogin),
  on(fromActions.loginSuccessAction, handleLoginSuccess),
  on(fromActions.loginFailAction, handleLoginFail),
  on(fromActions.logoutAction, handleLogout)
);

function handleLogin(
  state: ILoginState
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
  payload: fromActions.ILoginSuccessActionProps
): ILoginState {
  const { email, token } = payload;
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
  payload: fromActions.ILoginFailActionProps
): ILoginState {
  const email = null;
  const token = null;
  const loading = false;
  const { error } = payload;
  return {
    ...state,
    email,
    token,
    loading,
    error
  };
}

function handleLogout(
  state: ILoginState
): ILoginState {
  return {
    ...state,
    ...INIT_LOGIN_STATE,
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
export function getLoginHasError(state: ILoginState): boolean {
  return !!state.error;
}
export function getLoginErrorMessage(state: ILoginState): boolean {
  return !!state.error ? state.error.message : null;
}


export function reducer(state: ILoginState | undefined, action: Action) {
  return featureReducer(state, action);
}
