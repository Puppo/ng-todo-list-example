import { createReducer, on, Action } from '@ngrx/store';
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

const featureReducer = createReducer(
  INIT_REGISTER_STATE,
  on(fromActions.registerAction, handleRegister),
  on(fromActions.registerSuccessAction, handleRegisterSuccess),
  on(fromActions.registerFailAction, handleRegisterFail)
);

function handleRegister(
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

function handleRegisterSuccess(
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

function handleRegisterFail(
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

export function reducer(state: IRegisterState | undefined, action: Action) {
  return featureReducer(state, action);
}
