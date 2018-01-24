import * as moment from 'moment';

import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { ITodo } from '../../models';

@Component({
  selector: 'todo-list',
  styleUrls: ['./todo-list.component.scss'],
  template: `
  <mat-card class="todo-list">

    <mat-card-title>Todos</mat-card-title>

    <mat-list>
      <mat-list-item *ngFor="let todo of todos">
        <mat-icon mat-list-icon
        *ngIf="!!todo.completed"
        matTooltip="Complete">
          event_available
        </mat-icon>
        <mat-icon mat-list-icon
        *ngIf="!todo.completed"
        matTooltip="Not Complete">
          event_note
        </mat-icon>
        <h4 mat-line>{{todo.description}}</h4>
        <p mat-line *ngIf="!todo.completed"> {{dueDateFormat(todo.dueDate)}} </p>
        <button mat-icon-button (click)="onDelete(todo)">
            <mat-icon>delete</mat-icon>
        </button>
      </mat-list-item>
      <mat-list-item *ngIf="!todos || !todos.length">
        <h4 mat-line>Empty todos</h4>
      </mat-list-item>
    </mat-list>
  </mat-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent {
  @Input() todos: ITodo[];
  @Output() delete = new EventEmitter<ITodo>();

  dueDateFormat(dueDate: number): string {
    if (!!dueDate) {
      return moment(new Date(dueDate)).fromNow();
    }
    return '';
  }

  onDelete(todo: ITodo): void {
    this.delete.emit(todo);
  }
}
