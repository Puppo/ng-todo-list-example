import { browser, by, element } from 'protractor';

export class AppPage {
  browser() {
    return browser;
  }

  navigateTo() {
    return browser.get('/auth');
  }

  getAuthLoginSection() {
    return element(by.css('app-root auth-login'));
  }

  getUserMenu() {
    return element(by.css('app-root .app-user-actions'));
  }
  getEmailInput() {
    return element(
      by.css('app-root auth-login auth-form .auth-field__email input')
    );
  }
  getEmailRequiredError() {
    return element(
      by.css(
        'app-root auth-login auth-form .auth-field__email mat-error.auth-field__error_required'
      )
    );
  }
  getEmailFormatError() {
    return element(
      by.css(
        'app-root auth-login auth-form .auth-field__email mat-error.auth-field__error_email'
      )
    );
  }
  getPasswordInput() {
    return element(
      by.css('app-root auth-login auth-form .auth-field__password input')
    );
  }
  getPasswordRequiredError() {
    return element(
      by.css('app-root auth-login auth-form .auth-field__password mat-error.auth-field__error_required')
    );
  }

  getLoginError() {
    return element(
      by.css('app-root auth-login auth-form .error')
    );
  }
  getSubmitButton() {
    return element(by.css('app-root auth-login auth-form button'));
  }
}
