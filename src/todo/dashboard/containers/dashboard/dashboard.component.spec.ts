import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { Store } from '@ngrx/store';

import { getStoreStub } from '@test/todo-mock-store';

import * as fromActions from '../../../store/actions';

import { TodoSharedModule } from '../../../shared';
import { ITodo } from '../../../shared/models';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let el: DebugElement;
  let fb: FormBuilder;
  let store: Store<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        TodoSharedModule
      ],
      providers: [
        { provide: Store, useFactory: getStoreStub },
      ],
      declarations: [DashboardComponent]
    });

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fb = TestBed.get(FormBuilder);
    store = el.injector.get(Store);

  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should dispatch init action', () => {
    const dispatch = spyOn(store, 'dispatch');

    component.ngOnInit();

    const action = new fromActions.TodoListAction();
    expect(dispatch).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch add action', () => {
    const dispatch = spyOn(store, 'dispatch');

    const description = 'Todo Test';
    const dueDate = new Date().toISOString();
    const form = fb.group({
      description: [description],
      dueDate: [dueDate]
    });
    component.add(form);

    const action = new fromActions.TodoAddAction(description, new Date(dueDate).getTime());
    expect(dispatch).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch delete action', () => {
    const dispatch = spyOn(store, 'dispatch');

    const todo: ITodo = {
      id: 1,
      description: 'Test 1',
      dueDate: Date.now(),
      completed: false,
      email: 'test@test.com',
      createAt: Date.now(),
      updateAt: Date.now()
    };
    component.delete(todo);

    const action = new fromActions.TodoDeleteAction(todo.id);
    expect(dispatch).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(action);
  });
});
