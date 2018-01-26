import * as fromRouter from "./router.actions";

describe("Router Actions", () => {
  describe("GoAction", () => {
    it("should create an action", () => {
      const email = "test@testing.com";
      const password = "password";
      const payload = {
        path: ["/login"],
        query: { query: 2 }
      };

      const action = new fromRouter.Go(payload);

      expect({ ...action }).toEqual({
        type: fromRouter.GO,
        payload
      });
    });
  });

  describe("BackAction", () => {
    it("should create an action", () => {
      const action = new fromRouter.Back();

      expect({ ...action }).toEqual({
        type: fromRouter.BACK
      });
    });
  });

  describe("ForwardAction", () => {
    it("should create an action", () => {
      const action = new fromRouter.Forward();

      expect({ ...action }).toEqual({
        type: fromRouter.FORWARD
      });
    });
  });
});
