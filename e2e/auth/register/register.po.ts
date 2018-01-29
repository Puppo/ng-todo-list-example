import { browser, by, element } from 'protractor';

export class AppPage {
    browser() {
        return browser;
    }

    navigateTo(route: string) {
        browser.getCurrentUrl().then(
            (data) => {
                return (data.indexOf(route) < 0) ? browser.get(route) : null;
            }
        );
    }

    navigateToLogin() {
        return this.navigateTo('/auth/login');
    }

    navigateToRegister() {
        return this.navigateTo('/auth/register');
    }
    getAuthLoginSection() {
        return element(by.css('app-root auth-login'));
    }

    getUserMenu() {
        return element(by.css('app-root .app-user-actions'));
    }
    getNotRegisteredLink() {
        return element(
            by.css('app-root auth-login auth-form div.auth-form__toggle a')
        );
    }
    getAlreadyHaveAnAccountLink() {
        return element(
            by.css('app-root auth-register auth-form div.auth-form__toggle a')
        );
    }

    getAuthRegisterSection() {
        return element(by.css('app-root auth-register'));
    }

    getEmailInput() {
        return element(
            by.css('app-root auth-register auth-form [formcontrolname="email"]')
        );
    }

    getEmailRequiredError() {
        return element(
            by.css(
                'app-root auth-register auth-form .auth-field__email mat-error.auth-field__error_required'
            )
        );
    }
    getEmailFormatError() {
        return element(
            by.css(
                'app-root auth-register auth-form .auth-field__email mat-error.auth-field__error_email'
            )
        );
    }
    getPasswordInput() {
        return element(
            by.css('app-root auth-register auth-form [formcontrolname="password"]')
        );
    }
    getPasswordRequiredError() {
        return element(
            by.css('app-root auth-register auth-form .auth-field__password mat-error.auth-field__error_required')
        );
    }

    getLoginError() {
        return element(
            by.css('app-root auth-register auth-form .error')
        );
    }

    getSubmitButton() {
        return element(by.css('app-root auth-register auth-form button'));
    }


    getLoginEmailInput() {
        return element(
            by.css('app-root auth-login auth-form .auth-field__email input')
        );
    }

    getLoginPasswordInput() {
        return element(
            by.css('app-root auth-login auth-form .auth-field__password input')
        );
    }

    getLoginSubmitButton() {
        return element(by.css('app-root auth-login auth-form button'));
    }
}
