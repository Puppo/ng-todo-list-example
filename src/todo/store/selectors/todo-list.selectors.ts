import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromTodoList from '../reducers/todo-list.reducers';

export const getTodoListSelector = createSelector(
  fromFeature.getTodoSelector,
  (state: fromFeature.ITodoState) => state.list
);

export const getTodoListLoadingSelector = createSelector(
  getTodoListSelector,
  fromTodoList.getTodoListLoading
);

export const getTodoListTodosSelector = createSelector(
  getTodoListSelector,
  fromTodoList.getTodoListTodos
);

export const getTodoListErrorSelector = createSelector(
  getTodoListSelector,
  fromTodoList.getTodoListError
);
