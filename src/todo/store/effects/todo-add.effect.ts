import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { Actions, ofType, createEffect } from '@ngrx/effects';

import { of } from 'rxjs';
import { withLatestFrom, switchMap, map, catchError } from 'rxjs/operators';

import { TodoService, ITodo } from '../../shared';

import * as fromAuth from '../../../auth/store';
import * as fromActions from '../actions/todo-add.actions';
import * as fromTodoListActions from '../actions/todo-list.actions';

@Injectable()
export class TodoAddEffect {
  protected token$ = this.store.select(fromAuth.getLoginTokenSelector);
  protected email$ = this.store.select(fromAuth.getLoginEmailSelector);

  constructor(
    protected actions$: Actions,
    protected store: Store<fromAuth.IAuthState>,
    protected todoSv: TodoService
  ) {}

  add$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.TODO_ADD_ACTION),
      withLatestFrom(this.token$, this.email$),
      switchMap(([action, token, email]) => {
        const { description, dueDate } = action;
        const completed = false;
        const todo: ITodo = {
          description,
          dueDate,
          completed,
          email
        };
        return this.todoSv
          .add(token, todo)
          .pipe(
            map(res => fromActions.todoAddSuccessAction()),
            catchError(error => of(fromActions.todoAddFailAction(error)))
          );
      })
    ));

  addSuccess$ = createEffect(() => this.actions$
    .pipe(
      ofType(fromActions.TODO_ADD_SUCCESS_ACTION),
      map(action => fromTodoListActions.todoListAction())));
}
