import * as fromLogin from './login.reducer';
import * as fromActions from '../actions/login.actions';

describe('LoginReducer', () => {
  let service: fromLogin.LoginReducerService;
  const initLoginState: fromLogin.ILoginState = {
    email: null,
    token: null,
    loading: false,
    error: null
  };

  afterEach(() => {
    service = new fromLogin.LoginReducerService();
  });

  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as any;
      const state = service.reducer(undefined, action);

      expect(state).toEqual(initLoginState);
    });
  });

  describe('LOGIN_ACTION action', () => {
    it('should set loading to true', () => {
      const email = 'test@test.com';
      const password = '123456';
      const action = fromActions.loginAction({ email, password });
      const state = service.reducer(initLoginState, action);

      expect(state.loading).toEqual(true);
      expect(state.email).toBeNull();
      expect(state.token).toBeNull();
      expect(state.error).toBeNull();
    });
  });

  describe('LOGIN_SUCCESS_ACTION action', () => {
    it('should set user data', () => {
      const email = 'test@test.com';
      const token = 'erf$35tg';
      const action = fromActions.loginSuccessAction({ token, email });
      const state = service.reducer(initLoginState, action);

      expect(state.loading).toEqual(false);
      expect(state.email).toEqual(email);
      expect(state.token).toEqual(token);
      expect(state.error).toBeNull();
    });
  });

  describe('LOGIN_FAIL_ACTION action', () => {
    it('should set error', () => {
      const error = { message: 'Fatal Exception' };
      const action = fromActions.loginFailAction({ error });
      const state = service.reducer(initLoginState, action);

      expect(state.loading).toEqual(false);
      expect(state.email).toBeNull();
      expect(state.token).toBeNull();
      expect({ ...state.error }).toEqual({ ...error });
    });
  });

  describe('LOG_OUT_ACTION action', () => {
    it('should reset user', () => {
      const action = fromActions.logoutAction();
      const state = service.reducer(initLoginState, action);

      expect(state.loading).toEqual(false);
      expect(state.email).toBeNull();
      expect(state.token).toBeNull();
      expect(state.error).toBeNull();
    });
  });
});
