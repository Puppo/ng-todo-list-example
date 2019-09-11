import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromLogin from './login.reducer';
import * as fromRegister from './register.reducer';
import { InjectionToken, inject } from '@angular/core';

export interface IAuthState {
  login: fromLogin.ILoginState;
  register: fromRegister.IRegisterState;
}

export function authReducers() {
  const loginServ = inject(fromLogin.LoginReducerService);
  const registerServ = inject(fromRegister.RegisterReducerService);

  return {
    login: loginServ.reducer.bind(loginServ),
    register: registerServ.reducer.bind(registerServ),
  };
}

export const AUTH_REDUCER_TOKEN = new InjectionToken<ActionReducerMap<IAuthState>>('Auth Reducers', {
  factory: authReducers
});

export const AuthServicesReducers: any[] = [fromLogin.LoginReducerService, fromRegister.RegisterReducerService];

export const getAuthSelector = createFeatureSelector<IAuthState>(
  'auth'
);
