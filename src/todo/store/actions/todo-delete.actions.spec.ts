import * as fromTodoDelete from './todo-delete.actions';

describe('Todo Delete', () => {
  describe('DeleteActions', () => {
    it('should create an action', () => {
      const id = 5;
      const action = fromTodoDelete.todoDeleteAction({ id });

      expect({ ...action }).toEqual({
        type: fromTodoDelete.TODO_DELETE_ACTION,
        id
      });
    });
  });

  describe('DeleteSuccessActions', () => {
    it('should create an action', () => {
      const action = fromTodoDelete.todoDeleteSuccessAction();

      expect({ ...action }).toEqual({
        type: fromTodoDelete.TODO_DELETE_SUCCESS_ACTION
      });
    });
  });

  describe('DeleteFailActions', () => {
    it('should create an action', () => {
      const error = { message: 'Fatal exception' };
      const action = fromTodoDelete.todoDeleteFailAction({ error });

      expect({ ...action }).toEqual({
        type: fromTodoDelete.TODO_DELETE_FAIL_ACTION,
        error
      });
    });
  });
});
