import { ITodo } from './../../shared/models/todo.model';

export interface ITodoListSuccessActionProps {
  todos: ITodo[];
}

export interface ITodoListFailActionProps {
  error: any;
}
