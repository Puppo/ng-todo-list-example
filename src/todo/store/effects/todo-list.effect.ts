import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { Actions, ofType, createEffect } from '@ngrx/effects';

import { of } from 'rxjs';
import { withLatestFrom, switchMap, map, catchError } from 'rxjs/operators';

import { TodoService } from '../../shared';

import * as fromAuth from '../../../auth/store';
import * as fromActions from '../actions/todo-list.actions';

@Injectable()
export class TodoListEffect {
  constructor(
    protected actions$: Actions,
    protected store: Store<fromAuth.IAuthState>,
    protected todoSv: TodoService
  ) {}

  list$ = createEffect(() => this.actions$
  .pipe(
    ofType(fromActions.TODO_LIST_ACTION),
    withLatestFrom(
      this.store.select(fromAuth.getLoginTokenSelector),
      this.store.select(fromAuth.getLoginEmailSelector)
    ),
    switchMap(([action, token, email]) => {
      return this.todoSv.get(token, email)
      .pipe(
        map(todos => fromActions.todoListSuccessAction({todos})),
        catchError(error => of(fromActions.todoListFailAction({error})))
      );
    })
  ));
}
