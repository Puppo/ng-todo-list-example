import { Injectable, Component } from "@angular/core";
import { TestBed, fakeAsync, tick } from "@angular/core/testing";
import { Location } from "@angular/common";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { Routes, Router, RouterModule } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";

import { Actions, EffectsMetadata, getEffectsMetadata } from "@ngrx/effects";

import { hot, cold } from "jasmine-marbles";
import { provideMockActions } from "@ngrx/effects/testing";
import { Observable } from "rxjs/Observable";
import { empty } from "rxjs/observable/empty";
import { of } from "rxjs/observable/of";
import { _throw } from "rxjs/observable/throw";

import * as fromEffects from "./router.effect";
import * as fromActions from "../actions/router.actions";

@Component({
  template: "<router-outlet></router-outlet>"
})
class RoutingComponent {}

@Component({
  template: ""
})
class DummyComponent {}

describe("RouterEffects", () => {
  let actions$: Observable<any>;
  let effects: fromEffects.RouterEffects;
  let metadata: EffectsMetadata<fromEffects.RouterEffects>;
  let router: Router;
  let location: Location;

  const ROUTES: Routes = [
    { path: "path1", component: DummyComponent },
    { path: "path2", component: DummyComponent }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(ROUTES),
        HttpClientTestingModule
      ],
      declarations: [RoutingComponent, DummyComponent],
      providers: [fromEffects.RouterEffects, provideMockActions(() => actions$)]
    }).compileComponents();

    actions$ = TestBed.get(Actions);
    effects = TestBed.get(fromEffects.RouterEffects);
    metadata = getEffectsMetadata(effects);
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    router.initialNavigation();
  });

  describe("navigate$", () => {
    it("should navigate$ that dispatches an action", () => {
      expect(metadata.navigate$).toEqual({ dispatch: false });
    });

    it("should Go action call route navigation", () => {
      const navigateSpy = spyOn(router, "navigate");
      const payload = {
        path: ["/path2"],
        query: {
          param: 3
        }
      };
      effects.navigate$.subscribe(() => {
        expect(navigateSpy).toHaveBeenCalled();
        expect(navigateSpy).toHaveBeenCalledWith(payload.path, {
          query: payload.query
        });
      });
      const action = new fromActions.Go(payload);

      actions$ = hot("-a|", { a: action });
    });
  });

  describe("navigateBack$", () => {
    it("should navigateBack$ that dispatches an action", () => {
      expect(metadata.navigateBack$).toEqual({ dispatch: false });
    });

    it("should Back action call location back", () => {
      const backSpy = spyOn(location, "back");
      effects.navigateBack$.subscribe(() => {
        expect(backSpy).toHaveBeenCalled();
      });

      const action = new fromActions.Back();
      actions$ = hot("-a", { a: action });
    });
  });

  describe("navigateForward$", () => {
    it("should navigateForward$ that dispatches an action", () => {
      expect(metadata.navigateForward$).toEqual({ dispatch: false });
    });

    it("should Forward action call location forward", () => {
      const forwardSpy = spyOn(location, "forward");
      effects.navigateForward$.subscribe(() => {
        expect(forwardSpy).toHaveBeenCalled();
      });
      const action = new fromActions.Forward();

      actions$ = hot("-a", { a: action });
    });
  });
});
