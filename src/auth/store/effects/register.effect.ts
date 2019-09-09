import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';

import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import { AuthService } from '../../shared';
import * as fromRoot from '../../../app/store';
import * as fromActions from '../actions/register.actions';
import * as fromProps from './../actions/register.actions.model';

@Injectable()
export class RegisterEffect {
  constructor(protected actions$: Actions, protected authSv: AuthService) {}

  register$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.REGISTER_ACTION),
      switchMap((payload: fromProps.IRegisterActionProps) => {
        const { email, password } = payload;
        return this.authSv
          .register(email, password)
          .pipe(
            map(res => fromActions.registerSuccessAction()),
            catchError(err => of(fromActions.registerFailAction(err)))
          );
      })
    ));

  registerSuccess$ = createEffect(() => this.actions$
    .pipe(
      ofType(
        fromActions.REGISTER_SUCCESS_ACTION
      ),
      map(
        x =>
          fromRoot.go({
            path: ['/auth']
          })
      )
    ));
}
