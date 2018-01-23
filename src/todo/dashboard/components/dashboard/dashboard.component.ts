import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as fromStore from '../../../store';

@Component({
  selector: 'todo-dashboard',
  template: `
  <todo-add (submitted)="add($event)"></todo-add>

  `
})
export class DashboardComponent {
  constructor(protected store: Store<fromStore.ITodoState>) {}

  add(form: FormGroup): void {
    const description = form.get('description').value;
    const dueDate = form.get('dueDate').value;
    this.store.dispatch(new fromStore.TodoAddAction(description, dueDate));
  }
}
