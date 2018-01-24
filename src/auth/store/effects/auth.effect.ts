import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import { of } from 'rxjs/observable/of';
import { switchMap, map, catchError } from 'rxjs/operators';

import { AuthService } from '../../shared';
import * as fromRoot from '../../../app/store';
import * as fromActions from '../actions';

@Injectable()
export class AuthEffect {
  constructor(protected actions$: Actions, protected authSv: AuthService) {}

  @Effect()
  login$ = this.actions$
    .ofType<fromActions.LoginAction>(fromActions.LOGIN_ACTION)
    .pipe(
      switchMap(action => {
        const { email, password } = action;
        return this.authSv.login(email, password).pipe(
          map(res => {
            if (!!res) {
              return new fromActions.LoginSuccessAction(res, email);
            }
            return new fromActions.LoginFailAction({
              message: 'Invalid login'
            });
          }),
          catchError(err => of(new fromActions.LoginFailAction(err)))
        );
      })
    );

  @Effect()
  loginSuccess$ = this.actions$
    .ofType<fromActions.LoginSuccessAction>(fromActions.LOGIN_SUCCESS_ACTION)
    .pipe(
      map(x => new fromRoot.Go({
        path: ['/todo']
      }))
    );

  @Effect()
  register$ = this.actions$
    .ofType<fromActions.RegisterAction>(fromActions.REGISTER_ACTION)
    .pipe(
      switchMap(action => {
        const reqEmail = action.email;
        const reqPassword = action.password;
        return this.authSv.register(reqEmail, reqPassword).pipe(
          map(res => {
            return new fromActions.RegisterSuccessAction();
          }),
          catchError(err => of(new fromActions.RegisterFailAction(err)))
        );
      })
    );

  @Effect()
  registerSuccess$ = this.actions$
    .ofType<fromActions.RegisterSuccessAction>(fromActions.REGISTER_SUCCESS_ACTION)
    .pipe(
      map(x => new fromRoot.Go({
        path: ['/auth']
      }))
    );

  @Effect()
  logout$ = this.actions$
    .ofType<fromActions.LogoutAction>(fromActions.LOGOUT_ACTION)
    .pipe(
      map(x => new fromRoot.Go({
        path: ['/auth']
      }))
    );
}
