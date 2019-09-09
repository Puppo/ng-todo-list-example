import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { Actions, EffectsMetadata, getEffectsMetadata } from '@ngrx/effects';

import { hot, cold } from 'jasmine-marbles';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';

import { ApiUrl } from '../../../constants';
import { AuthService } from '../../shared/services/auth/auth.service';
import * as fromRoute from '../../../app/store/actions';
import * as fromEffects from './login.effect';
import * as fromActions from '../actions/login.actions';
import { Injectable } from '@angular/core';

describe('LoginEffect', () => {
  let actions$: Observable<any>;
  let service: AuthService;
  let effects: fromEffects.LoginEffect;
  let metadata: EffectsMetadata<fromEffects.LoginEffect>;

  const token = '2';
  const email = 'test@test.com';
  const password = '123456';
  const fatalError = { message: 'Fatal exception' };
  const invalidLoginError = { message: 'Invalid login' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        fromEffects.LoginEffect,
        provideMockActions(() => actions$),
        { provide: ApiUrl, useValue: 'http://localhost' }
      ]
    });

    actions$ = TestBed.get(Actions);
    service = TestBed.get(AuthService);
    effects = TestBed.get(fromEffects.LoginEffect);
    metadata = getEffectsMetadata(effects);
  });

  describe('login$', () => {
    it('should login$ that dispatches an action', () => {
      expect(metadata.login$).toEqual({ dispatch: true });
    });

    it('should return a LoginSuccessActiondata from LoginAction', () => {
      spyOn(service, 'login').and.returnValue(of(token));

      const action = new fromActions.LoginAction(email, password);
      const completion = new fromActions.LoginSuccessAction(token, email);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.login$).toBeObservable(expected);
    });

    it('should return a LoginFailAction 'Invalid Login' from LoginAction', () => {
      spyOn(service, 'login').and.returnValue(of(null));

      const action = new fromActions.LoginAction(email, password);
      const completion = new fromActions.LoginFailAction(invalidLoginError);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.login$).toBeObservable(expected);
    });

    it('should return a LoginFailAction from LoginAction', () => {
      spyOn(service, 'login').and.returnValue(_throw(fatalError));

      const action = new fromActions.LoginAction(email, password);
      const completion = new fromActions.LoginFailAction(fatalError);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.login$).toBeObservable(expected);
    });
  });

  describe('loginSuccess$', () => {
    it('should loginSuccess$ that dispatches an action', () => {
      expect(metadata.loginSuccess$).toEqual({ dispatch: true });
    });

    it('should return a redirect action from LoginSuccessAction', () => {
      const action = new fromActions.LoginSuccessAction(token, email);
      const completion = new fromRoute.Go({
        path: ['/todo']
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.loginSuccess$).toBeObservable(expected);
    });
  });

  describe('logout$', () => {
    it('should logout$ that dispatches an action', () => {
      expect(metadata.logout$).toEqual({ dispatch: true });
    });

    it('should return a redirect action from LogoutAction', () => {
      const action = new fromActions.LogoutAction();
      const completion = new fromRoute.Go({
        path: ['/auth']
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.logout$).toBeObservable(expected);
    });
  });
});
