import * as fromRegister from './register.reducer';
import * as fromActions from '../actions/register.actions';

describe('RegisterReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { INIT_REGISTER_STATE } = fromRegister;
      const action = {} as any;
      const state = fromRegister.reducer(undefined, action);

      expect(state).toBe(INIT_REGISTER_STATE);
    });
  });

  describe('REGISTER_ACTION action', () => {
    it('should set loading to true', () => {
      const { INIT_REGISTER_STATE } = fromRegister;
      const email = 'test@test.com';
      const password = '123456';
      const action = new fromActions.RegisterAction(email, password);
      const state = fromRegister.reducer(INIT_REGISTER_STATE, action);

      expect(state.loading).toEqual(true);
      expect(state.success).toEqual(false);
      expect(state.error).toBeNull();
    });
  });

  describe('REGISTER_SUCCESS_ACTION action', () => {
    it('should set success to true', () => {
      const { INIT_REGISTER_STATE } = fromRegister;
      const action = new fromActions.RegisterSuccessAction();
      const state = fromRegister.reducer(INIT_REGISTER_STATE, action);

      expect(state.loading).toEqual(false);
      expect(state.success).toEqual(true);
      expect(state.error).toBeNull();
    });
  });

  describe('REGISTER_FAIL_ACTION action', () => {
    it('should set error', () => {
      const { INIT_REGISTER_STATE } = fromRegister;
      const error = { message: 'Fatal Exception' };
      const action = new fromActions.RegisterFailAction(error);
      const state = fromRegister.reducer(INIT_REGISTER_STATE, action);

      expect(state.loading).toEqual(false);
      expect(state.success).toEqual(false);
      expect({ ...state.error }).toEqual({ ...error });
    });
  });
});
