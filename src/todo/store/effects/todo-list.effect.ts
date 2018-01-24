import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';

import { of } from 'rxjs/observable/of';
import { withLatestFrom, switchMap, map, catchError } from 'rxjs/operators';

import { TodoService, ITodo } from '../../shared';

import * as fromAuth from '../../../auth/store';
import * as fromActions from '../actions/todo-list.actions';

@Injectable()
export class TodoListEffect {
  constructor(
    protected actions$: Actions,
    protected store: Store<fromAuth.IAuthState>,
    protected todoSv: TodoService
  ) {}

  @Effect()
  list$ = this.actions$
  .ofType<fromActions.TodoListAction>(fromActions.TODO_LIST_ACTION)
  .pipe(
    withLatestFrom(
      this.store.select(fromAuth.getLoginTokenSelector),
      this.store.select(fromAuth.getLoginEmailSelector)
    ),
    switchMap(([action, token, email]) => {
      return this.todoSv.get(token, email)
      .pipe(
        map(todos => new fromActions.TodoListSuccessAction(todos)),
        catchError(error => of(new fromActions.TodoListFailAction(error)))
      );
    })
  );
}
