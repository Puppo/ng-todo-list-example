import * as fromTodoAdd from './todo-add.reducer';
import * as fromActions from '../actions/todo-add.actions';

describe('TodoAddReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { INIT_TODO_ADD_STATE } = fromTodoAdd;
      const action = {} as any;
      const state = fromTodoAdd.reducer(undefined, action);

      expect(state).toBe(INIT_TODO_ADD_STATE);
    });
  });

  describe('TODO_ADD_ACTION action', () => {
    it('should set loading to true', () => {
      const { INIT_TODO_ADD_STATE } = fromTodoAdd;
      const description = 'Todo add description';
      const dueDate = Date.now();
      const action = fromActions.todoAddAction({description, dueDate});
      const state = fromTodoAdd.reducer(INIT_TODO_ADD_STATE, action);

      expect(state.loading).toEqual(true);
      expect(state.error).toBeNull();
    });
  });

  describe('TODO_ADD_SUCCESS_ACTION action', () => {
    it('should set success to true', () => {
      const { INIT_TODO_ADD_STATE } = fromTodoAdd;
      const action = fromActions.todoAddSuccessAction();
      const state = fromTodoAdd.reducer(INIT_TODO_ADD_STATE, action);

      expect(state.loading).toEqual(false);
      expect(state.error).toBeNull();
    });
  });

  describe('TODO_ADD_FAIL_ACTION action', () => {
    it('should set error', () => {
      const { INIT_TODO_ADD_STATE } = fromTodoAdd;
      const error = { message: 'Fatal Exception' };
      const action = fromActions.todoAddFailAction({error});
      const state = fromTodoAdd.reducer(INIT_TODO_ADD_STATE, action);

      expect(state.loading).toEqual(false);
      expect({ ...state.error }).toEqual({ ...error });
    });
  });
});
