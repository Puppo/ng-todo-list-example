import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { Actions, EffectsMetadata, getEffectsMetadata } from '@ngrx/effects';

import { hot, cold } from 'jasmine-marbles';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { empty } from 'rxjs/observable/empty';
import { _throw } from 'rxjs/observable/throw';

import { ApiUrl } from '../../../constants';
import { AuthService } from '../../shared/services/auth/auth.service';
import * as fromRoute from '../../../app/store/actions';
import * as fromEffects from './register.effect';
import * as fromActions from '../actions/register.actions';
import { Injectable } from '@angular/core';

describe('RegisterEffect', () => {
  let actions$: Observable<any>;
  let service: AuthService;
  let effects: fromEffects.RegisterEffect;
  let metadata: EffectsMetadata<fromEffects.RegisterEffect>;

  const token = '2';
  const email = 'test@test.com';
  const password = '123456';
  const fatalError = { message: 'Fatal exception' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        fromEffects.RegisterEffect,
        provideMockActions(() => actions$),
        { provide: ApiUrl, useValue: 'http://localhost' }
      ]
    });

    actions$ = TestBed.get(Actions);
    service = TestBed.get(AuthService);
    effects = TestBed.get(fromEffects.RegisterEffect);
    metadata = getEffectsMetadata(effects);
  });

  describe('register$', () => {
    it('should register$ that dispatches an action', () => {
      expect(metadata.register$).toEqual({ dispatch: true });
    });

    it('should return a RegisterSuccessAction from RegisterAction', () => {
      spyOn(service, 'register').and.returnValue(empty());

      const action = fromActions.registerAction({email, password});
      const completion = fromActions.registerSuccessAction();

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.register$).toBeObservable(expected);
    });

    it('should return a RegisterFailAction from RegisterAction', () => {
      spyOn(service, 'register').and.returnValue(_throw(fatalError));

      const action = fromActions.registerAction({email, password});
      const completion = fromActions.registerFailAction({
        error: fatalError
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.register$).toBeObservable(expected);
    });
  });

  describe('registerSuccess$', () => {
    it('should registerSuccess$ that dispatches an action', () => {
      expect(metadata.registerSuccess$).toEqual({ dispatch: true });
    });

    it('should return a redirect action from RegisterSuccessAction', () => {
      const action = fromActions.registerSuccessAction();
      const completion = fromRoute.go({
        path: ['/auth']
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.registerSuccess$).toBeObservable(expected);
    });
  });
});
