import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';

import { of } from 'rxjs/observable/of';
import { withLatestFrom, switchMap, map, catchError } from 'rxjs/operators';

import { TodoService, ITodo } from '../../shared';

import * as fromAuth from '../../../auth/store';
import * as fromActions from '../actions/todo-add.actions';
import * as fromTodoListActions from '../actions/todo-list.actions';

@Injectable()
export class TodoAddEffect {
  constructor(
    protected actions$: Actions,
    protected store: Store<fromAuth.IAuthState>,
    protected todoSv: TodoService
  ) {}

  @Effect()
  add$ = this.actions$
    .ofType<fromActions.TodoAddAction>(fromActions.TODO_ADD_ACTION)
    .pipe(
      withLatestFrom(
        this.store.select(fromAuth.getLoginTokenSelector),
        this.store.select(fromAuth.getLoginEmailSelector)
      ),
      switchMap(([action, token, email]) => {
        const { description, dueDate } = action;
        const completed = false;
        const todo: ITodo = {
          description,
          dueDate,
          completed,
          email
        };
        return this.todoSv.add(token, todo)
        .pipe(
          map(res => new fromActions.TodoAddSuccessAction()),
          catchError(error => of(new fromActions.TodoAddFailAction(error)))
        );
      })
    );

  @Effect()
  addSuccess$ = this.actions$
  .ofType(fromActions.TODO_ADD_SUCCESS_ACTION)
  .pipe(
    map(action => new fromTodoListActions.TodoListAction())
  );
}
