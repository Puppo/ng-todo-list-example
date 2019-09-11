import * as fromTodoAdd from './todo-add.reducer';
import * as fromActions from '../actions/todo-add.actions';

describe('TodoAddReducer', () => {
  let service: fromTodoAdd.TodoAddReducerService;
  const initTodoAddState: fromTodoAdd.ITodoAddState = {
    loading: false,
    error: null
  };

  afterEach(() => {
    service = new fromTodoAdd.TodoAddReducerService();
  });

  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as any;
      const state = service.reducer(undefined, action);

      expect(state).toEqual(initTodoAddState);
    });
  });

  describe('TODO_ADD_ACTION action', () => {
    it('should set loading to true', () => {
      const description = 'Todo add description';
      const dueDate = Date.now();
      const action = fromActions.todoAddAction({description, dueDate});
      const state = service.reducer(initTodoAddState, action);

      expect(state.loading).toEqual(true);
      expect(state.error).toBeNull();
    });
  });

  describe('TODO_ADD_SUCCESS_ACTION action', () => {
    it('should set success to true', () => {
      const action = fromActions.todoAddSuccessAction();
      const state = service.reducer(initTodoAddState, action);

      expect(state.loading).toEqual(false);
      expect(state.error).toBeNull();
    });
  });

  describe('TODO_ADD_FAIL_ACTION action', () => {
    it('should set error', () => {
      const error = { message: 'Fatal Exception' };
      const action = fromActions.todoAddFailAction({error});
      const state = service.reducer(initTodoAddState, action);

      expect(state.loading).toEqual(false);
      expect({ ...state.error }).toEqual({ ...error });
    });
  });
});
