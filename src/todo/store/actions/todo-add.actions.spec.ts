import * as fromTodoAdd from './todo-add.actions';

describe('Todo Add', () => {
  describe('AddActions', () => {
    it('should create an action', () => {
      const dueDate = Date.now();
      const description = 'todo description';
      const action = fromTodoAdd.todoAddAction({ description, dueDate });

      expect({ ...action }).toEqual({
        type: fromTodoAdd.TODO_ADD_ACTION,
        description,
        dueDate
      });
    });
  });

  describe('AddSuccessActions', () => {
    it('should create an action', () => {
      const action = fromTodoAdd.todoAddSuccessAction();

      expect({ ...action }).toEqual({
        type: fromTodoAdd.TODO_ADD_SUCCESS_ACTION
      });
    });
  });

  describe('AddFailActions', () => {
    it('should create an action', () => {
      const error = { message: 'Fatal exception' };
      const action = fromTodoAdd.todoAddFailAction({ error });

      expect({ ...action }).toEqual({
        type: fromTodoAdd.TODO_ADD_FAIL_ACTION,
        error
      });
    });
  });
});
