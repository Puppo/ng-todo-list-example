import { ILoginActionProps } from './../actions/login.actions.model';
import * as fromActions from '../actions';
import { on, createReducer, Action, ActionReducer } from '@ngrx/store';
import { Injectable } from '@angular/core';

export interface ILoginState {
  email: string;
  token: string;
  loading: boolean;
  error: any;
}

@Injectable()
export class LoginReducerService {

  protected get initLoginState(): ILoginState {
    return {
      email: null,
      token: null,
      loading: false,
      error: null
    };
  }

  protected get featureReducer(): ActionReducer<ILoginState, Action> {
    return createReducer(
      this.initLoginState,
      on(fromActions.loginAction, this.handleLogin),
      on(fromActions.loginSuccessAction, this.handleLoginSuccess),
      on(fromActions.loginFailAction, this.handleLoginFail),
      on(fromActions.logoutAction, this.handleLogout.bind(this))
    );
  }

  reducer(state: ILoginState | undefined, action: Action): ILoginState {
    return this.featureReducer(state, action);
  }

  protected handleLogin(
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

  protected handleLoginSuccess(
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

  protected handleLoginFail(
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

  protected handleLogout(
    state: ILoginState
  ): ILoginState {
    return {
      ...state,
      ...this.initLoginState,
    };
  }

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
