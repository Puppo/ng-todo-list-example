import { StoreModule, Store, combineReducers } from '@ngrx/store';

import { TestBed } from '@angular/core/testing';

import * as fromReducers from '../reducers/index';
import * as fromActions from '../actions/todo-add.actions';
import * as fromSelectors from './todo-add.selectors';

describe('Todo Add Selectors', () => {
  let store: Store<fromReducers.ITodoState>;

  const description = 'Todo testing description';
  const dueDate = Date.now();
  const error = { message: 'Fatal exception' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          todo: combineReducers(fromReducers.todoReducers)
        })
      ]
    });

    store = TestBed.get(Store);
  });

  describe('getTodoAddState', () => {
    it('should return state of todo add store slice', () => {
      let result;

      store
        .select(fromSelectors.getTodoAddSelector)
        .subscribe(value => (result = value));

      expect(result).toEqual({
        loading: false,
        error: null
      });

      store.dispatch(fromActions.todoAddSuccessAction());

      expect(result).toEqual({
        loading: false,
        error: null
      });
    });
  });

  describe('getTodoAddLoading', () => {
    it('should return the todo add loading state', () => {
      let result;

      store
        .select(fromSelectors.getTodoAddLoadingSelector)
        .subscribe(value => (result = value));

      expect(result).toEqual(false);

      store.dispatch(fromActions.todoAddAction({description, dueDate}));

      expect(result).toEqual(true);
    });
  });

  describe('getTodoAddError', () => {
    it('should return the todo add error state', () => {
      let result;

      store
        .select(fromSelectors.getTodoAddErrorSelector)
        .subscribe(value => (result = value));

      expect(result).toBeNull();

      store.dispatch(fromActions.todoAddFailAction({error}));

      expect({ ...result }).toEqual({ ...error });
    });
  });
});
