import { AppPage } from './register.po';

describe('ng-todo-list-example App Register', () => {
  let page: AppPage;
  const mail = `test_${Date.now()}@test.it`;
  const pwd = '123456';

  describe('ng-todo-list-example App Register (display)', () => {

    beforeEach(() => {
      page = new AppPage();
    });

    it('should display auth-login component', () => {
      page.navigateToLogin();
      expect(page.getAuthLoginSection().isPresent()).toBeTruthy();
    });

    it('should not display user logout action', () => {
      page.navigateToLogin();
      expect(page.getUserMenu().isPresent()).toBeFalsy();
    });

    it('should display "Not registered?" link', () => {
      page.navigateToLogin();
      expect(page.getNotRegisteredLink().isPresent()).toBeTruthy();
    });

    it('should navigate to auth/register on "Not registered?" link click', () => {
      page.navigateToLogin();
      page.getNotRegisteredLink().click();
      page.browser().waitForAngular();
      expect(page.browser().getCurrentUrl()).toEqual(`${page.browser().baseUrl}/auth/register`);
    });

    it('should display register form', () => {
      page.navigateToRegister();
      expect(page.getAuthRegisterSection().isPresent()).toBeTruthy();
    });

    it('should display register email input', () => {
      page.navigateToRegister();
      expect(page.getEmailInput().isPresent()).toBeTruthy();
    });

    it('should display register password input', () => {
      page.navigateToRegister();
      expect(page.getPasswordInput().isPresent()).toBeTruthy();
    });

    it('should display register submit input', () => {
      page.navigateToRegister();
      expect(page.getSubmitButton().isPresent()).toBeTruthy();
    });

    it('should display register "Already have an account?" link', () => {
      page.navigateToRegister();
      expect(page.getAlreadyHaveAnAccountLink().isPresent()).toBeTruthy();
    });
  });

  describe('ng-todo-list-example App Register (Inputs)', () => {

    beforeEach(() => {
      page = new AppPage();
      page.navigateToRegister();
      page.getEmailInput().clear();
      page.getPasswordInput().clear();
    });

    it('should show email required error', () => {
      const email = '';
      page.getEmailInput().sendKeys(email);
      page.browser().driver.sleep(500);
      page.getSubmitButton().click();
      expect(page.getEmailInput().getAttribute('value')).toEqual(email);
      expect(page.getEmailRequiredError().isPresent()).toBeTruthy();
      expect(page.getEmailFormatError().isPresent()).toBeFalsy();
    });

    it('should show email format error', () => {
      const email = 'test';
      page.getEmailInput().sendKeys(email);
      page.browser().driver.sleep(500);
      page.getSubmitButton().click();
      expect(page.getEmailInput().getAttribute('value')).toEqual(email);
      expect(page.getEmailRequiredError().isPresent()).toBeFalsy();
      expect(page.getEmailFormatError().isPresent()).toBeTruthy();
    });

    it('should show password required error', () => {
      const password = '';
      page.getPasswordInput().sendKeys(password);
      page.browser().driver.sleep(500);
      page.getSubmitButton().click();
      expect(page.getPasswordInput().getAttribute('value')).toEqual(password);
      expect(page.getPasswordRequiredError().isPresent()).toBeTruthy();
    });

    it('should fail on existing user', () => {
      page.getEmailInput().sendKeys('test@test.eu');
      page.browser().driver.sleep(500);
      page.getPasswordInput().sendKeys(pwd);
      page.browser().driver.sleep(500);
      page.getSubmitButton().click();
      page.browser().waitForAngular();
      expect(page.browser().getCurrentUrl()).toEqual(`${page.browser().baseUrl}/auth/login`);
    });

    it('should register new user', () => {
      page.getEmailInput().sendKeys(mail);
      page.browser().driver.sleep(500);
      page.getPasswordInput().sendKeys(pwd);
      page.browser().driver.sleep(500);
      page.getSubmitButton().click();
      page.browser().waitForAngular();
      expect(page.browser().getCurrentUrl()).toEqual(`${page.browser().baseUrl}/auth/login`);
    });
  });

  describe('ng-todo-list-example App Register (Login)', () => {
    beforeEach(() => {
      page = new AppPage();
    });

    it('should new user access', () => {
      page.navigateToLogin();
      page.getLoginEmailInput().sendKeys(mail);
      page.browser().driver.sleep(500);
      page.getLoginPasswordInput().sendKeys(pwd);
      page.browser().driver.sleep(500);
      page.getLoginSubmitButton().click();
      page.browser().waitForAngular();
      expect(page.browser().getCurrentUrl()).toEqual(`${page.browser().baseUrl}/todo/dashboard`);
    });
  });
});


