import { StoreModule, Store, combineReducers } from '@ngrx/store';
import { ROUTER_NAVIGATION } from '@ngrx/router-store';

import { TestBed } from '@angular/core/testing';

import { ITodo } from '../../shared/models';

import * as fromRoot from '../../../app/store';
import * as fromReducers from '../reducers/index';
import * as fromActions from '../actions/todo-list.actions';
import * as fromSelectors from './todo-list.selectors';

describe('Todo List Selectors', () => {
  let store: Store<fromReducers.ITodoState>;

  const todos: ITodo[] = [
    {
      id: 1,
      description: 'Test 1',
      dueDate: Date.now(),
      completed: false,
      email: 'test@test.it',
      createAt: Date.now(),
      updateAt: Date.now()
    },
    {
      id: 2,
      description: 'Test 2',
      dueDate: new Date(2018, 1, 3).getTime(),
      completed: true,
      email: 'test@test.it',
      createAt: new Date(2018, 1, 2).getTime(),
      updateAt: new Date(2018, 1, 3).getTime()
    }
  ];
  const error = { message: 'Fatal exception' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          todo: combineReducers(fromReducers.reducers)
        })
      ]
    });

    store = TestBed.get(Store);
  });

  describe('getTodoListState', () => {
    it('should return state of todo list store slice', () => {
      let result;

      store
        .select(fromSelectors.getTodoListSelector)
        .subscribe(value => (result = value));

      expect(result).toEqual({
        loading: false,
        error: null,
        todos: null
      });

      store.dispatch(new fromActions.TodoListSuccessAction(todos));

      expect(result).toEqual({
        loading: false,
        error: null,
        todos
      });
    });
  });

  describe('getTodoListLoading', () => {
    it('should return the todo list loading state', () => {
      let result;

      store
        .select(fromSelectors.getTodoListLoadingSelector)
        .subscribe(value => (result = value));

      expect(result).toEqual(false);

      store.dispatch(new fromActions.TodoListAction());

      expect(result).toEqual(true);
    });
  });

  describe('getTodoListTodos', () => {
    it('should return the todo list todos state', () => {
      let result;

      store
        .select(fromSelectors.getTodoListTodosSelector)
        .subscribe(value => (result = value));

      expect(result).toBeNull();

      store.dispatch(new fromActions.TodoListSuccessAction(todos));

      expect(result).toEqual(todos);
    });
  });

  describe('getTodoListError', () => {
    it('should return the todo list error state', () => {
      let result;

      store
        .select(fromSelectors.getTodoListErrorSelector)
        .subscribe(value => (result = value));

      expect(result).toBeNull();

      store.dispatch(new fromActions.TodoListFailAction(error));

      expect({ ...result }).toEqual({ ...error });
    });
  });
});
