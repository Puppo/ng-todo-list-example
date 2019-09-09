import * as fromTodoList from './todo-list.reducer';
import * as fromActions from '../actions/todo-list.actions';
import { ITodo } from '../../shared/models';

describe('TodoListReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { INIT_TODO_LIST_STATE } = fromTodoList;
      const action = {} as any;
      const state = fromTodoList.reducer(undefined, action);

      expect(state).toBe(INIT_TODO_LIST_STATE);
    });
  });

  describe('TODO_LIST_ACTION action', () => {
    it('should set loading to true', () => {
      const { INIT_TODO_LIST_STATE } = fromTodoList;
      const action = fromActions.todoListAction();
      const state = fromTodoList.reducer(INIT_TODO_LIST_STATE, action);

      expect(state.loading).toEqual(true);
      expect(state.todos).toBeNull();
      expect(state.error).toBeNull();
    });
  });

  describe('TODO_LIST_SUCCESS_ACTION action', () => {
    it('should set success to true', () => {
      const { INIT_TODO_LIST_STATE } = fromTodoList;
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
      const action = fromActions.todoListSuccessAction({todos});
      const state = fromTodoList.reducer(INIT_TODO_LIST_STATE, action);

      expect(state.loading).toEqual(false);
      expect(state.todos).toEqual(todos);
      expect(state.todos.length).toEqual(todos.length);
      expect(state.error).toBeNull();
    });
  });

  describe('TODO_LIST_FAIL_ACTION action', () => {
    it('should set error', () => {
      const { INIT_TODO_LIST_STATE } = fromTodoList;
      const error = { message: 'Fatal Exception' };
      const action = fromActions.todoListFailAction({error});
      const state = fromTodoList.reducer(INIT_TODO_LIST_STATE, action);

      expect(state.loading).toEqual(false);
      expect(state.todos).toBeNull();
      expect({ ...state.error }).toEqual({ ...error });
    });
  });
});
