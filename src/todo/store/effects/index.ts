import { TodoAddEffect } from './todo-add.effect';
import { TodoDeleteEffect } from './todo-delete.effect';
import { TodoListEffect } from './todo-list.effect';

export * from './todo-add.effect';
export * from './todo-delete.effect';
export * from './todo-list.effect';

export const effects: any[] = [
  TodoAddEffect,
  TodoDeleteEffect,
  TodoListEffect
];
