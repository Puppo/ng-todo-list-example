import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material';

import { Store } from '@ngrx/store';

import { getStoreStub } from '@test/todo-mock-store';

import * as fromActions from '../../../store/actions';

import { AuthSharedModule } from '../../../shared/shared.module';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let el: DebugElement;
  let fb: FormBuilder;
  let store: Store<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule, MatButtonModule, AuthSharedModule],
      providers: [{ provide: Store, useFactory: getStoreStub }],
      declarations: [LoginComponent]
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fb = TestBed.get(FormBuilder);
    store = el.injector.get(Store);
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should dispatch login action', () => {
    const dispatch = spyOn(store, 'dispatch');

    const email = 'test@test.com';
    const password = 'wer£24';
    const form = fb.group({
      email: [email],
      password: [password]
    });
    component.submit(form);

    const action = fromActions.loginAction({ email, password });
    expect(dispatch).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(action);
  });
});
