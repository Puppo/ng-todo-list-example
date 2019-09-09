import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { Actions, ofType, createEffect } from '@ngrx/effects';

import { of } from 'rxjs';
import { withLatestFrom, switchMap, map, catchError } from 'rxjs/operators';

import { TodoService, ITodo } from '../../shared';

import * as fromAuth from '../../../auth/store';
import * as fromTodoListActions from '../actions/todo-list.actions';
import * as fromActions from '../actions/todo-delete.actions';

@Injectable()
export class TodoDeleteEffect {
  constructor(
    protected actions$: Actions,
    protected store: Store<fromAuth.IAuthState>,
    protected todoSv: TodoService
  ) {}

  delete$ = createEffect(() => this.actions$
  .pipe(
    ofType(fromActions.TODO_DELETE_ACTION),
    withLatestFrom(this.store.select(fromAuth.getLoginTokenSelector)),
    switchMap(([action, token]) => {
      const { id } = action;
      return this.todoSv.delete(token, id)
      .pipe(
        map(todos => fromActions.todoDeleteSuccessAction()),
        catchError(error => of(fromActions.todoDeleteFailAction(error)))
      );
    })
  ));

  deleteSuccess$ = createEffect(() => this.actions$
  .pipe(
    ofType(fromActions.TODO_DELETE_SUCCESS_ACTION),
    map(action => fromTodoListActions.todoListAction())
  ));
}
