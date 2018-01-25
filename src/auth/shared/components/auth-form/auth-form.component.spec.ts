import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { MatCardModule, MatInputModule, MatFormFieldModule } from '@angular/material';

import { AuthFormComponent } from './auth-form.component';

describe('AuthFormComponent', () => {
  let component: AuthFormComponent;
  let fixture: ComponentFixture<AuthFormComponent>;
  let el: DebugElement;
  let form: DebugElement;
  let emailControl: AbstractControl;
  let passwordControl: AbstractControl;
  let submit;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        MatCardModule,
        MatInputModule,
        MatFormFieldModule
      ],
      declarations: [AuthFormComponent]
    });

    fixture = TestBed.createComponent(AuthFormComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    form = el.query(By.css('form'));
    emailControl = component.form.get('email');
    passwordControl = component.form.get('password');
    submit = spyOn(component.submitted, 'emit');
  });

  afterEach(() => {
    fixture.destroy();
  });

  describe('Emit submit', () => {
    it('should emit submitted event', () => {
      emailControl.setValue('test@test.it');
      passwordControl.setValue('Pedr£4556');
      form.triggerEventHandler('ngSubmit', null);

      expect(submit).toHaveBeenCalled();
      expect(submit).toHaveBeenCalledWith(component.form);
    });

    it('should no emit submitted event when invalid email', () => {
      emailControl.setValue('test.it');
      passwordControl.setValue('Pedr£4556');
      form.triggerEventHandler('ngSubmit', null);

      expect(submit).not.toHaveBeenCalled();
    });

    it('should no emit submitted event when invalid password', () => {
      emailControl.setValue('test@test.it');
      passwordControl.setValue('');
      form.triggerEventHandler('ngSubmit', null);

      expect(submit).not.toHaveBeenCalled();
    });

    it('should no emit submitted event when invalid email and password', () => {
      form.triggerEventHandler('ngSubmit', null);

      expect(submit).not.toHaveBeenCalled();
    });
  });

  describe('Email validation', () => {
    it('should show message required email', () => {
      emailControl.markAsTouched();

      expect(component.emailRequired).toBeTruthy();
    });

    it('should show message invalid email', () => {
      emailControl.setValue('test.it');
      emailControl.markAsTouched();

      expect(component.emailFormat).toBeTruthy();
    });
  });

  describe('', () => {
    it('should show message required password', () => {
      passwordControl.markAsTouched();

      expect(component.passwordInvalid).toBeTruthy();
    });
  });
});
