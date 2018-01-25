import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';

import { hot, cold } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { empty } from 'rxjs/observable/empty';
import { _throw } from 'rxjs/observable/throw';

import { getStoreStub } from '@test/todo-mock-store';

import { ApiUrl } from '../../../constants';
import { ITodo } from '../../shared/models';
import { TodoService } from '../../shared/services/todo/todo.service';
import * as fromRoute from '../../../app/store';
import * as fromAuth from '../../../auth/store';
import * as fromTodoListActions from '../actions/todo-list.actions';
import * as fromActions from '../actions/todo-add.actions';
import * as fromEffects from './todo-add.effect';

describe('TodoAddEffect', () => {
  let actions$: Observable<any>;
  let service: TodoService;
  let effects: fromEffects.TodoAddEffect;

  const description = 'test@test.com';
  const dueDate = Date.now();
  const todo: ITodo = {
    id: 1,
    description: 'Test 1',
    dueDate: Date.now(),
    completed: false,
    email: 'test@test.it',
    createAt: Date.now(),
    updateAt: Date.now()
  };
  const fatalError = { message: 'Fatal exception' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TodoService,
        fromEffects.TodoAddEffect,
        provideMockActions(() => actions$),
        { provide: Store, useFactory: getStoreStub },
        { provide: ApiUrl, useValue: 'http://localhost' }
      ]
    });

    actions$ = TestBed.get(Actions);
    service = TestBed.get(TodoService);
    effects = TestBed.get(fromEffects.TodoAddEffect);
  });

  describe('add$', () => {
    it('should return a TodoAddSuccessAction from TodoAddAction', () => {
      spyOn(service, 'add').and.returnValue(of(todo));

      const action = new fromActions.TodoAddAction(description, dueDate);
      const completion = new fromActions.TodoAddSuccessAction();

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.add$).toBeObservable(expected);
    });

    it('should return a TodoAddFailAction from TodoAddAction', () => {
      spyOn(service, 'add').and.returnValue(_throw(fatalError));

      const action = new fromActions.TodoAddAction(description, dueDate);
      const completion = new fromActions.TodoAddFailAction(fatalError);

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.add$).toBeObservable(expected);
    });
  });

  describe('addSuccess$', () => {
    it('should return a redirect action from TodoAddSuccessAction', () => {
      const action = new fromActions.TodoAddSuccessAction();
      const completion = new fromTodoListActions.TodoListAction();

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.addSuccess$).toBeObservable(expected);
    });
  });
});
