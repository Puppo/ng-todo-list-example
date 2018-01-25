import { StoreModule, Store, combineReducers } from '@ngrx/store';
import { ROUTER_NAVIGATION } from '@ngrx/router-store';

import { TestBed } from '@angular/core/testing';

import * as fromRoot from '../../../app/store';
import * as fromReducers from '../reducers/index';
import * as fromActions from '../actions/register.actions';
import * as fromSelectors from './register.selectors';

describe('Register Selectors', () => {
  let store: Store<fromReducers.IAuthState>;

  const email = 'test@test.com';
  const password = 'testing';
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

  describe('getRegisterState', () => {
    it('should return state of register store slice', () => {
      let result;

      store
        .select(fromSelectors.getRegisterSelector)
        .subscribe(value => (result = value));

      expect(result).toEqual({
        loading: false,
        success: false,
        error: null
      });

      store.dispatch(new fromActions.RegisterSuccessAction());

      expect(result).toEqual({
        loading: false,
        success: true,
        error: null
      });
    });
  });

  describe('getRegisterLoading', () => {
    it('should return the register loading state', () => {
      let result;

      store
        .select(fromSelectors.getRegisterLoadingSelector)
        .subscribe(value => (result = value));

      expect(result).toEqual(false);

      store.dispatch(new fromActions.RegisterAction(email, password));

      expect(result).toEqual(true);
    });
  });

  describe('getRegisterSuccess', () => {
    it('should return the register loading state', () => {
      let result;

      store
        .select(fromSelectors.getRegisterSuccessSelector)
        .subscribe(value => (result = value));

      expect(result).toEqual(false);

      store.dispatch(new fromActions.RegisterSuccessAction());

      expect(result).toEqual(true);
    });
  });

  describe('getRegisterError', () => {
    it('should return the register error state', () => {
      let result;

      store
        .select(fromSelectors.getRegisterErrorSelector)
        .subscribe(value => (result = value));

      expect(result).toBeNull();

      store.dispatch(new fromActions.RegisterFailAction(error));

      expect({ ...result }).toEqual({ ...error });
    });
  });

  describe('getRegisterHasError', () => {
    it('should return the register has error state', () => {
      let result;

      store
        .select(fromSelectors.getRegisterHasErrorSelector)
        .subscribe(value => (result = value));

      expect(result).toBeFalsy();

      store.dispatch(new fromActions.RegisterFailAction(error));

      expect(result).toBeTruthy();
    });
  });

  describe('getRegisterErrorMessage', () => {
    it('should return the register error message state', () => {
      let result;

      store
        .select(fromSelectors.getRegisterErrorMessageSelector)
        .subscribe(value => (result = value));

      expect(result).toBeFalsy();

      store.dispatch(new fromActions.RegisterFailAction(error));

      expect(result).toBeTruthy();
    });
  });
});
