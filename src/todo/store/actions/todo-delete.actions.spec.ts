import * as fromTodoDelete from './todo-delete.actions';
import { ITodo } from '../../shared/models';

describe('Todo Delete', () => {
  describe('DeleteActions', () => {
    it('should create an action', () => {
      const id = 5;
      const action = new fromTodoDelete.TodoDeleteAction(id);

      expect({ ...action }).toEqual({
        type: fromTodoDelete.TODO_DELETE_ACTION,
        id
      });
    });
  });

  describe('DeleteSuccessActions', () => {
    it('should create an action', () => {
      const action = new fromTodoDelete.TodoDeleteSuccessAction();

      expect({ ...action }).toEqual({
        type: fromTodoDelete.TODO_DELETE_SUCCESS_ACTION
      });
    });
  });

  describe('DeleteFailActions', () => {
    it('should create an action', () => {
      const error = { message: 'Fatal exception' };
      const action = new fromTodoDelete.TodoDeleteFailAction(error);

      expect({ ...action }).toEqual({
        type: fromTodoDelete.TODO_DELETE_FAIL_ACTION,
        error
      });
    });
  });
});
