import { StoreModule, Store, combineReducers } from '@ngrx/store';
import { ROUTER_NAVIGATION } from '@ngrx/router-store';

import { TestBed } from '@angular/core/testing';

import * as fromRoot from '../../../app/store';
import * as fromReducers from '../reducers/index';
import * as fromActions from '../actions/login.actions';
import * as fromSelectors from './login.selectors';

describe('Login Selectors', () => {
  let store: Store<fromReducers.IAuthState>;

  const email = 'test@test.com';
  const password = 'testing';
  const token = 'Efr45E32';
  const error = { message: 'Fatal exception' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          auth: combineReducers(fromReducers.reducers)
        })
      ]
    });

    store = TestBed.get(Store);
  });

  describe('getLoginState', () => {
    it('should return state of login store slice', () => {
      let result;

      store
        .select(fromSelectors.getLoginSelector)
        .subscribe(value => (result = value));

      expect(result).toEqual({
        email: null,
        token: null,
        loading: false,
        error: null
      });

      store.dispatch(new fromActions.LoginSuccessAction(token, email));

      expect(result).toEqual({
        email,
        token,
        loading: false,
        error: null
      });
    });
  });

  describe('getLoginEmail', () => {
    it('should return the login email state', () => {
      let result;

      store
        .select(fromSelectors.getLoginEmailSelector)
        .subscribe(value => (result = value));

      expect(result).toBeNull();

      store.dispatch(new fromActions.LoginSuccessAction(token, email));

      expect(result).toEqual(email);
    });
  });

  describe('getLoginToken', () => {
    it('should return the login token state', () => {
      let result;

      store
        .select(fromSelectors.getLoginTokenSelector)
        .subscribe(value => (result = value));

      expect(result).toBeNull();

      store.dispatch(new fromActions.LoginSuccessAction(token, email));

      expect(result).toEqual(token);
    });
  });

  describe('getLoginLoading', () => {
    it('should return the login loading state', () => {
      let result;

      store
        .select(fromSelectors.getLoginLoadingSelector)
        .subscribe(value => (result = value));

      expect(result).toEqual(false);

      store.dispatch(new fromActions.LoginAction(email, password));

      expect(result).toEqual(true);
    });
  });

  describe('getLoginError', () => {
    it('should return the login error state', () => {
      let result;

      store
        .select(fromSelectors.getLoginErrorSelector)
        .subscribe(value => (result = value));

      expect(result).toBeNull();

      store.dispatch(new fromActions.LoginFailAction(error));

      expect({ ...result }).toEqual({ ...error });
    });
  });

  describe('getLoginHasError', () => {
    it('should return the login has error state', () => {
      let result;

      store
        .select(fromSelectors.getLoginHasErrorSelector)
        .subscribe(value => (result = value));

      expect(result).toBeFalsy();

      store.dispatch(new fromActions.LoginFailAction(error));

      expect(result).toBeTruthy();
    });
  });

  describe('getLoginErrorMessage', () => {
    it('should return the login error message state', () => {
      let result;

      store
        .select(fromSelectors.getLoginErrorMessageSelector)
        .subscribe(value => (result = value));

      expect(result).toBeFalsy();

      store.dispatch(new fromActions.LoginFailAction(error));

      expect(result).toBeTruthy();
    });
  });
});
