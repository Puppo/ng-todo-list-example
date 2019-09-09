import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { Store } from '@ngrx/store';
import { Actions, EffectsMetadata, getEffectsMetadata } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';

import { hot, cold } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';

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
  let metadata: EffectsMetadata<fromEffects.TodoAddEffect>;

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
    metadata = getEffectsMetadata(effects);
  });

  describe('add$', () => {
    it('should add$ that dispatches an action', () => {
      expect(metadata.add$).toEqual({ dispatch: true });
    });

    it('should return a TodoAddSuccessAction from TodoAddAction', () => {
      spyOn(service, 'add').and.returnValue(of(todo));

      const action = fromActions.todoAddAction({description, dueDate});
      const completion = fromActions.todoAddSuccessAction();

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.add$).toBeObservable(expected);
    });

    it('should return a TodoAddFailAction from TodoAddAction', () => {
      spyOn(service, 'add').and.returnValue(throwError(fatalError));

      const action = fromActions.todoAddAction({description, dueDate});
      const completion = fromActions.todoAddFailAction({
        error: fatalError
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.add$).toBeObservable(expected);
    });
  });

  describe('addSuccess$', () => {
    it('should addSuccess$ that dispatches an action', () => {
      expect(metadata.addSuccess$).toEqual({ dispatch: true });
    });

    it('should return a redirect action from TodoAddSuccessAction', () => {
      const action = fromActions.todoAddSuccessAction();
      const completion = fromTodoListActions.todoListAction();

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.addSuccess$).toBeObservable(expected);
    });
  });
});
