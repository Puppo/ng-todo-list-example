import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';

import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import { AuthService } from '../../shared';
import * as fromRoot from '../../../app/store';
import * as fromActions from '../actions/login.actions';

@Injectable()
export class LoginEffect {
  constructor(protected actions$: Actions, protected authSv: AuthService) {}

  login$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.LOGIN_ACTION),
      switchMap(action => {
        const { email, password } = action;
        return this.authSv.login(email, password).pipe(
          map(res => {
            if (!!res) {
              return fromActions.loginSuccessAction({
                token: res, email
              });
            }
            return fromActions.loginFailAction({
              error: {
                message: 'Invalid login'
              }
            });
          }),
          catchError(error => of(fromActions.loginFailAction({error})))
        );
      })
    ));

  loginSuccess$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.LOGIN_SUCCESS_ACTION),
      map(
        x =>
          fromRoot.go({
            path: ['/todo']
          })
      )
    ));
  logout$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.LOGOUT_ACTION),
      map(
        x =>
          fromRoot.go({
            path: ['/auth']
          })
      )
    ));
}
