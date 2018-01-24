import * as fromTodoList from './todo-list.actions';
import { ITodo } from '../../shared/models';

describe('Todo List', () => {
  describe('ListActions', () => {
    it('should create an action', () => {
      const dueDate = Date.now();
      const description = 'todo description';
      const action = new fromTodoList.TodoListAction();

      expect({ ...action }).toEqual({
        type: fromTodoList.TODO_LIST_ACTION
      });
    });
  });

  describe('ListSuccessActions', () => {
    it('should create an action', () => {
      const todos: ITodo[] = [
        {
          id: 1,
          description: 'Prova 1',
          dueDate: Date.now(),
          completed: false,
          email: 'prova1@prova.it',
          createAt: Date.now(),
          updateAt: Date.now()
        },
        {
          id: 2,
          description: 'Prova 2',
          dueDate: new Date(2018, 1, 3).getTime(),
          completed: true,
          email: 'prova2@prova.it',
          createAt: new Date(2018, 1, 2).getTime(),
          updateAt: new Date(2018, 1, 3).getTime()
        }
      ];
      const action = new fromTodoList.TodoListSuccessAction(todos);

      expect({ ...action }).toEqual({
        type: fromTodoList.TODO_LIST_SUCCESS_ACTION,
        todos
      });
      expect(todos.length).toEqual(action.todos.length);
    });
  });

  describe('ListFailActions', () => {
    it('should create an action', () => {
      const error = { message: 'Fatal exception' };
      const action = new fromTodoList.TodoListFailAction(error);

      expect({ ...action }).toEqual({
        type: fromTodoList.TODO_LIST_FAIL_ACTION,
        error
      });
    });
  });
});
