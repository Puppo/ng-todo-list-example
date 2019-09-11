import * as fromRegister from './register.actions';

describe('Auth Register Actions', () => {
  describe('RegisterActions', () => {
    it('should create an action', () => {
      const email = 'test@testing.com';
      const password = 'password';
      const action = fromRegister.registerAction({ email, password });

      expect({ ...action }).toEqual({
        type: fromRegister.REGISTER_ACTION,
        email,
        password
      });
    });
  });

  describe('RegisterSuccessAction', () => {
    it('should create an action', () => {
      const action = fromRegister.registerSuccessAction();

      expect({ ...action }).toEqual({
        type: fromRegister.REGISTER_SUCCESS_ACTION
      });
    });
  });

  describe('RegisterFailAction', () => {
    it('should create an action', () => {
      const error = { message: 'Fatal exceptions' };
      const action = fromRegister.registerFailAction({ error });

      expect({ ...action }).toEqual({
        type: fromRegister.REGISTER_FAIL_ACTION,
        error
      });
    });
  });
});
