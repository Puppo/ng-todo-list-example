import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromTodoAdd from './todo-add.reducers';

export interface ITodoState {
  add: fromTodoAdd.ITodoAddState;
}

export const reducers: ActionReducerMap<ITodoState> = {
  add: fromTodoAdd.reducer,
};

export const getTodoSelector = createFeatureSelector<ITodoState>(
  'todo'
);
