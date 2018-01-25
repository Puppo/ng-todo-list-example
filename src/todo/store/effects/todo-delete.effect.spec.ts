import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';

import { hot, cold } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { empty } from 'rxjs/observable/empty';

import { ApiUrl } from '../../../constants';
import { ITodo } from '../../shared/models';
import { TodoService } from '../../shared/services/todo/todo.service';
import * as fromRoute from '../../../app/store';
import * as fromAuth from '../../../auth/store';
import * as fromTodoListActions from '../actions/todo-list.actions';
import * as fromActions from '../actions/todo-delete.actions';
import { MockStore } from './todo-mock-store';
import * as fromEffects from './todo-delete.effect';

function getStoreStub(): any {
  return new MockStore(undefined);
}

describe('TodoDeleteEffect', () => {
  let actions$: Observable<any>;
  let service: TodoService;
  let effects: fromEffects.TodoDeleteEffect;

  const id = 1;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TodoService,
        fromEffects.TodoDeleteEffect,
        provideMockActions(() => actions$),
        { provide: Store, useFactory: getStoreStub },
        { provide: ApiUrl, useValue: 'http://localhost' }
      ]
    });

    actions$ = TestBed.get(Actions);
    service = TestBed.get(TodoService);
    effects = TestBed.get(fromEffects.TodoDeleteEffect);

    spyOn(service, 'delete').and.returnValue(of(empty()));
  });

  describe('delete$', () => {
    it('should return a TodoDeleteSuccessAction from TodoDeleteAction', () => {
      const action = new fromActions.TodoDeleteAction(id);
      const completion = new fromActions.TodoDeleteSuccessAction();

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.delete$).toBeObservable(expected);
    });
  });

  describe('deleteSuccess$', () => {
    it('should return a redirect action from TodoDeleteSuccessAction', () => {
      const action = new fromActions.TodoDeleteSuccessAction();
      const completion = new fromTodoListActions.TodoListAction();

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.deleteSuccess$).toBeObservable(expected);
    });
  });
});
