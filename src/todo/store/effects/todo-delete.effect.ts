import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';

import { of } from 'rxjs/observable/of';
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

  @Effect()
  delete$ = this.actions$
  .ofType<fromActions.TodoDeleteAction>(fromActions.TODO_DELETE_ACTION)
  .pipe(
    withLatestFrom(this.store.select(fromAuth.getLoginTokenSelector)),
    switchMap(([action, token]) => {
      const { id } = action;
      return this.todoSv.delete(token, id)
      .pipe(
        map(todos => new fromActions.TodoDeleteSuccessAction()),
        catchError(error => of(new fromActions.TodoDeleteFailAction(error)))
      );
    })
  );

  @Effect()
  deleteSuccess$ = this.actions$
  .ofType<fromActions.TodoDeleteSuccessAction>(fromActions.TODO_DELETE_SUCCESS_ACTION)
  .pipe(
    map(action => new fromTodoListActions.TodoListAction())
  );
}
