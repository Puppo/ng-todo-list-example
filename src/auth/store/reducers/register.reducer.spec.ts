import * as fromRegister from './register.reducer';
import * as fromActions from '../actions/register.actions';

describe('RegisterReducer', () => {
  let service: fromRegister.RegisterReducerService;
  const initRegisterState: fromRegister.IRegisterState = {
    loading: false,
    success: false,
    error: null
  };

  afterEach(() => {
    service = new fromRegister.RegisterReducerService();
  });

  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as any;
      const state = service.reducer(undefined, action);

      expect(state).toEqual(initRegisterState);
    });
  });

  describe('REGISTER_ACTION action', () => {
    it('should set loading to true', () => {
      const email = 'test@test.com';
      const password = '123456';
      const action = fromActions.registerAction({ email, password });
      const state = service.reducer(initRegisterState, action);

      expect(state.loading).toEqual(true);
      expect(state.success).toEqual(false);
      expect(state.error).toBeNull();
    });
  });

  describe('REGISTER_SUCCESS_ACTION action', () => {
    it('should set success to true', () => {
      const action = fromActions.registerSuccessAction();
      const state = service.reducer(initRegisterState, action);

      expect(state.loading).toEqual(false);
      expect(state.success).toEqual(true);
      expect(state.error).toBeNull();
    });
  });

  describe('REGISTER_FAIL_ACTION action', () => {
    it('should set error', () => {
      const error = { message: 'Fatal Exception' };
      const action = fromActions.registerFailAction({ error });
      const state = service.reducer(initRegisterState, action);

      expect(state.loading).toEqual(false);
      expect(state.success).toEqual(false);
      expect({ ...state.error }).toEqual({ ...error });
    });
  });
});
