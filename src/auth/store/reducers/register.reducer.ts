import { createReducer, on, Action, ActionReducer } from '@ngrx/store';
import * as fromActions from '../actions';
import { Injectable } from '@angular/core';

export interface IRegisterState {
  loading: boolean;
  success: boolean;
  error: any;
}

@Injectable()
export class RegisterReducerService {

  protected get initRegisterState(): IRegisterState {
    return {
      loading: false,
      success: false,
      error: null
    };
  }

  protected get featureReducer(): ActionReducer<IRegisterState, Action> {
    return createReducer(
      this.initRegisterState,
      on(fromActions.registerAction, this.handleRegister),
      on(fromActions.registerSuccessAction, this.handleRegisterSuccess),
      on(fromActions.registerFailAction, this.handleRegisterFail)
    );
  }

  reducer(state: IRegisterState | undefined, action: Action): IRegisterState {
    return this.featureReducer(state, action);
  }

  protected handleRegister(
    state: IRegisterState
  ): IRegisterState {
    const loading = true;
    const success = false;
    const error = null;
    return {
      ...state,
      loading,
      success,
      error
    };
  }

  protected handleRegisterSuccess(
    state: IRegisterState
  ): IRegisterState {
    const loading = false;
    const success = true;
    const error = null;
    return {
      ...state,
      loading,
      success,
      error
    };
  }

  protected handleRegisterFail(
    state: IRegisterState,
    payload: fromActions.IRegisterFailActionProps
  ): IRegisterState {
    const loading = false;
    const success = false;
    const { error } = payload;
    return {
      ...state,
      loading,
      success,
      error
    };
  }

}

export function getRegisterLoading(state: IRegisterState): boolean {
  return state.loading;
}
export function getRegisterSuccess(state: IRegisterState): boolean {
  return state.success;
}
export function getRegisterError(state: IRegisterState): any {
  return state.error;
}
export function getRegisterHasError(state: IRegisterState): any {
  return !!state.error;
}

export function getRegisterErrorMessage(state: IRegisterState): any {
  return !!state.error ? state.error.message : null;
}
