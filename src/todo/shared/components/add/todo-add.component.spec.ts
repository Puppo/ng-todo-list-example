import { DebugElement } from "@angular/core";
import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { CommonModule } from "@angular/common";
import {
  AbstractControl,
  ReactiveFormsModule,
  FormsModule
} from "@angular/forms";
import { By } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  MatCardModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatFormFieldModule
} from "@angular/material";

import { TodoAddComponent } from "./todo-add.component";

describe("TodoAddComponent", () => {
  let component: TodoAddComponent;
  let fixture: ComponentFixture<TodoAddComponent>;
  let el: DebugElement;
  let form: DebugElement;
  let descriptionControl: AbstractControl;
  let dueDateControl: AbstractControl;
  let submit;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule
      ],
      declarations: [TodoAddComponent]
    });

    fixture = TestBed.createComponent(TodoAddComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    form = el.query(By.css("form"));
    descriptionControl = component.form.get("description");
    dueDateControl = component.form.get("dueDate");
    submit = spyOn(component.submitted, "emit");
  });

  afterEach(() => {
    fixture.destroy();
  });

  describe("Emit submit", () => {
    it("should emit submitted event", () => {
      descriptionControl.setValue("Todo test");
      dueDateControl.setValue(new Date().toISOString());
      fixture.detectChanges();
      form.triggerEventHandler("ngSubmit", null);

      expect(submit).toHaveBeenCalled();
      expect(submit).toHaveBeenCalledWith(component.form);
    });

    it("should emit submitted event without due date", () => {
      descriptionControl.setValue("Todo test");
      fixture.detectChanges();
      form.triggerEventHandler("ngSubmit", null);

      expect(submit).toHaveBeenCalled();
      expect(submit).toHaveBeenCalledWith(component.form);
    });

    it("should emit submitted event without due date", () => {
      descriptionControl.setValue("Todo test");
      fixture.detectChanges();
      form.triggerEventHandler("ngSubmit", null);

      expect(submit).toHaveBeenCalled();
      expect(submit).toHaveBeenCalledWith(component.form);
    });
  });

  describe("Description input", () => {
    it("should show message required description", () => {
      descriptionControl.markAsTouched();

      expect(component.descriptionRequired).toBeTruthy();
    });
  });
});
