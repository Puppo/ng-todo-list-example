import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'todo-add',
  styleUrls: ['./todo-add.component.scss'],
  template: `
  <mat-card class="todo-add">
    <mat-card-title>
      Add Todo
    </mat-card-title>

    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <mat-form-field class="todo-field">
        <input matInput
        placeholder="Description"
        formControlName="description" />
        <mat-error *ngIf="descriptionRequired">Description is required</mat-error>
      </mat-form-field>

      <mat-form-field class="todo-field">
        <input matInput [matDatepicker]="picker" [min]="minDate" placeholder="Due date">
        <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
        <mat-datepicker #picker></mat-datepicker>
      </mat-form-field>

      <button mat-raised-button color="primary">Add</button>
    </form>
  </mat-card>
  `
})
export class TodoAddComponent {
  @Output()
  submitted = new EventEmitter<FormGroup>();

  minDate = Date.now();

  form = this.fb.group({
    description: ['', Validators.required],
    dueDate: [null]
  });

  constructor(
    private fb: FormBuilder
  ) {}

  onSubmit() {
    if (this.form.valid) {
      this.submitted.emit(this.form);
    }
  }

  // get dueDateInvalid() {
  //   const control = this.form.get('dueDate');
  //   return control.hasError('required') && control.touched;
  // }

  get descriptionRequired() {
    const control = this.form.get('description');
    return control.hasError('required') && control.touched;
  }
}
