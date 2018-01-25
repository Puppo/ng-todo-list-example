import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import {
  MatCardModule,
  MatInputModule,
  MatListModule,
  MatIconModule,
  MatFormFieldModule
} from '@angular/material';

import { ITodo } from '../../models';
import { TodoListComponent } from './todo-list.component';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let el: DebugElement;
  const todos: ITodo[] = [{
    id: 1,
    description: 'Test 1',
    dueDate: Date.now(),
    completed: false,
    email: 'test@test.it',
    createAt: Date.now(),
    updateAt: Date.now()
  }, {
    id: 2,
    description: 'Test 2',
    dueDate: null,
    completed: false,
    email: 'test@test.it',
    createAt: Date.now(),
    updateAt: Date.now()
  }];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        MatCardModule,
        MatInputModule,
        MatListModule,
        MatIconModule,
        MatFormFieldModule
      ],
      declarations: [TodoListComponent]
    });

    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    component.todos = todos;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  describe('Emit delete', () => {
    it('should emit submitted event', () => {
      const deleteEmitter = spyOn(component.delete, 'emit');

      el.query(By.css('button')).triggerEventHandler('click', null);

      expect(deleteEmitter).toHaveBeenCalled();
      expect(deleteEmitter).toHaveBeenCalledWith(todos[0]);
    });
  });

  describe('Due Date', () => {
    it('should not show due date if it null', () => {
      expect(component.dueDateFormat(todos[1].dueDate)).toBe('');
    });

    it('should show due date if it set', () => {
      expect(component.dueDateFormat(todos[0].dueDate)).toBeTruthy();
    });
  });
});
