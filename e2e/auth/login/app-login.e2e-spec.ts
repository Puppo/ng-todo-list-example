import { AppPage } from './login.po';

describe('ng-todo-list-example App Login', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display auth-login component', () => {
    page.navigateTo();
    expect(page.getAuthLoginSection().isPresent()).toBeTruthy();
  });

  it('should not display user logout action', () => {
    page.navigateTo();
    expect(page.getUserMenu().isPresent()).toBeFalsy();
  });

  it('should complete auth-login component', () => {
    page.navigateTo();
    const email = 'test@test.eu';
    const password = '123456';
    page.getEmailInput().sendKeys(email);
    page.browser().driver.sleep(500);
    page.getPasswordInput().sendKeys(password);
    page.browser().driver.sleep(500);
    expect(page.getEmailInput().getAttribute('value')).toEqual(email);
    expect(page.getPasswordInput().getAttribute('value')).toEqual(password);
    page.getSubmitButton().click();
    page.browser().waitForAngular();
    page.browser().driver.sleep(1000);
    expect(page.browser().getCurrentUrl()).toEqual(`${page.browser().baseUrl}/todo/dashboard`);
  });

  it('should show email required error', () => {
    page.navigateTo();
    const email = '';
    page.getEmailInput().sendKeys(email);
    page.browser().driver.sleep(500);
    page.getSubmitButton().click();
    expect(page.getEmailInput().getAttribute('value')).toEqual(email);
    expect(page.getEmailRequiredError().isPresent()).toBeTruthy();
    expect(page.getEmailFormatError().isPresent()).toBeFalsy();
  });

  it('should show email format error', () => {
    page.navigateTo();
    const email = 'test';
    page.getEmailInput().sendKeys(email);
    page.browser().driver.sleep(500);
    page.getSubmitButton().click();
    expect(page.getEmailInput().getAttribute('value')).toEqual(email);
    expect(page.getEmailRequiredError().isPresent()).toBeFalsy();
    expect(page.getEmailFormatError().isPresent()).toBeTruthy();
  });

  it('should show password required error', () => {
    page.navigateTo();
    const password = '';
    page.getPasswordInput().sendKeys(password);
    page.browser().driver.sleep(500);
    page.getSubmitButton().click();
    expect(page.getPasswordInput().getAttribute('value')).toEqual(password);
    expect(page.getPasswordRequiredError().isPresent()).toBeTruthy();
  });

  it('should show error message if login fail', () => {
    page.navigateTo();
    const email = 'test@test.it';
    const password = '123456';
    page.getEmailInput().sendKeys(email);
    page.getPasswordInput().sendKeys(password);
    page.browser().driver.sleep(500);
    page.getSubmitButton().click();
    page.browser().driver.sleep(500);
    expect(page.getEmailInput().getAttribute('value')).toEqual(email);
    expect(page.getPasswordInput().getAttribute('value')).toEqual(password);
    expect(page.getEmailFormatError().isPresent()).toBeFalsy();
    expect(page.getPasswordRequiredError().isPresent()).toBeFalsy();
    expect(page.getLoginError().isPresent()).toBeTruthy();
  });
});
