import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import { of } from 'rxjs/observable/of';
import { switchMap, map, catchError } from 'rxjs/operators';

import { AuthService } from '../../shared';
import * as fromRoot from '../../../app/store';
import * as fromActions from '../actions/register.actions';

@Injectable()
export class RegisterEffect {
  constructor(protected actions$: Actions, protected authSv: AuthService) {}

  @Effect()
  register$ = this.actions$
    .ofType<fromActions.RegisterAction>(fromActions.REGISTER_ACTION)
    .pipe(
      switchMap(action => {
        const reqEmail = action.email;
        const reqPassword = action.password;
        return this.authSv
          .register(reqEmail, reqPassword)
          .pipe(
            map(res => new fromActions.RegisterSuccessAction()),
            catchError(err => of(new fromActions.RegisterFailAction(err)))
          );
      })
    );

  @Effect()
  registerSuccess$ = this.actions$
    .ofType<fromActions.RegisterSuccessAction>(
      fromActions.REGISTER_SUCCESS_ACTION
    )
    .pipe(
      map(
        x =>
          new fromRoot.Go({
            path: ['/auth']
          })
      )
    );
}
