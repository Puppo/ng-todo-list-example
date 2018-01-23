import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromLogin from './login.reducer';
import * as fromRegister from './register.reducer';

export interface IAuthState {
  login: fromLogin.ILoginState;
  register: fromRegister.IRegisterState;
}

export const reducers: ActionReducerMap<IAuthState> = {
  login: fromLogin.reducer,
  register: fromRegister.reducer,
};

export const getAuthSelector = createFeatureSelector<IAuthState>(
  'auth'
);
