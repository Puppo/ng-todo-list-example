import { Action } from '@ngrx/store';

import * as fromActions from '../actions';

export interface IRegisterState {
  loading: boolean;
  success: boolean;
  error: any;
}

export const INIT_REGISTER_STATE: IRegisterState = {
  loading: false,
  success: false,
  error: null
};

export function reducer(
  state = INIT_REGISTER_STATE,
  action: fromActions.RegisterActions
): IRegisterState {
  switch (action.type) {
    case fromActions.REGISTER_ACTION:
      return handleRegister(state, action);
    case fromActions.REGISTER_SUCCESS_ACTION:
      return handleRegisterSuccess(state, action);
    case fromActions.REGISTER_FAIL_ACTION:
      return handleRegisterFail(state, action);

    default:
      return state;
  }
}

function handleRegister(
  state: IRegisterState,
  action: fromActions.RegisterAction
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

function handleRegisterSuccess(
  state: IRegisterState,
  action: fromActions.RegisterSuccessAction
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

function handleRegisterFail(
  state: IRegisterState,
  action: fromActions.RegisterFailAction
): IRegisterState {
  const loading = false;
  const success = false;
  const { error } = action;
  return {
    ...state,
    loading,
    error
  };
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
