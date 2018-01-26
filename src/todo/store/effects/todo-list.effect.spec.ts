import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";

import { Store } from "@ngrx/store";
import { Actions, EffectsMetadata, getEffectsMetadata } from "@ngrx/effects";
import { provideMockActions } from "@ngrx/effects/testing";

import { hot, cold } from "jasmine-marbles";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { _throw } from "rxjs/observable/throw";

import { getStoreStub } from "@test/todo-mock-store";

import { ApiUrl } from "../../../constants";
import { ITodo } from "../../shared/models";
import { TodoService } from "../../shared/services/todo/todo.service";
import * as fromRoute from "../../../app/store";
import * as fromAuth from "../../../auth/store";
import * as fromTodoListActions from "../actions/todo-list.actions";
import * as fromActions from "../actions/todo-list.actions";
import * as fromEffects from "./todo-list.effect";

describe("TodoListEffect", () => {
  let actions$: Observable<any>;
  let service: TodoService;
  let effects: fromEffects.TodoListEffect;
  let metadata: EffectsMetadata<fromEffects.TodoListEffect>;

  const todos: ITodo[] = [
    {
      id: 1,
      description: "Test 1",
      dueDate: Date.now(),
      completed: false,
      email: "test@test.it",
      createAt: Date.now(),
      updateAt: Date.now()
    },
    {
      id: 2,
      description: "Test 2",
      dueDate: new Date(2018, 1, 3).getTime(),
      completed: true,
      email: "test@test.it",
      createAt: new Date(2018, 1, 2).getTime(),
      updateAt: new Date(2018, 1, 3).getTime()
    }
  ];
  const fatalError = { message: "Fatal exception" };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TodoService,
        fromEffects.TodoListEffect,
        provideMockActions(() => actions$),
        { provide: Store, useFactory: getStoreStub },
        { provide: ApiUrl, useValue: "http://localhost" }
      ]
    });

    actions$ = TestBed.get(Actions);
    service = TestBed.get(TodoService);
    effects = TestBed.get(fromEffects.TodoListEffect);
    metadata = getEffectsMetadata(effects);
  });

  describe("list$", () => {
    it("should list$ that dispatches an action", () => {
      expect(metadata.list$).toEqual({ dispatch: true });
    });

    it("should return a TodoListSuccessAction from TodoListAction", () => {
      spyOn(service, "get").and.returnValue(of(todos));

      const action = new fromActions.TodoListAction();
      const completion = new fromActions.TodoListSuccessAction(todos);

      actions$ = hot("-a", { a: action });
      const expected = cold("-b", { b: completion });

      expect(effects.list$).toBeObservable(expected);
    });

    it("should return a TodoListFailAction from TodoListAction", () => {
      spyOn(service, "get").and.returnValue(_throw(fatalError));

      const action = new fromActions.TodoListAction();
      const completion = new fromActions.TodoListFailAction(fatalError);

      actions$ = hot("-a", { a: action });
      const expected = cold("-b", { b: completion });

      expect(effects.list$).toBeObservable(expected);
    });
  });
});
