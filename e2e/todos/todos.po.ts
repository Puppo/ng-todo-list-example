import { browser, by, element } from 'protractor';

export class AppPage {
    [x: string]: any;


    browser() {
        return browser;

    }

    getUserMenu() {
        return element(by.css('app-root .app-user-actions'));
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

    navigateToTodos() {
        return this.navigateTo('/todo/dashboard');
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


    getTodosDescriptionInput() {
        return element(by.css('app-root todo-dashboard todo-add [formcontrolname="description"]'));
    }

    getTodosDescriptionInputRequireError() {
        const input = element(by.css('app-root todo-dashboard todo-add [formcontrolname="description"]'));
        const parent = input.element(by.xpath('ancestor::div[contains(@class, "mat-input-wrapper")]'));
        return parent.element(by.css('mat-error'));
    }

    getTodosDueDateInput() {
        return element(by.css('app-root todo-dashboard todo-add [formcontrolname="dueDate"]'));
    }

    getTodosAddButton() {
        const result = element(by.css('app-root todo-dashboard todo-add button.add-item'));
        return result;
    }

    getTodosCalendarButton() {
        const result = element(by.css('app-root todo-dashboard todo-add mat-datepicker-toggle button'));
        return result;
    }

    getTodosCalendarToday() {
        const result = element(by.css('.mat-calendar-body-today'));
        return result;
    }

    getTodoListItems() {
        return element.all(by.css('app-root todo-dashboard todo-list mat-list mat-list-item'));
    }

    getTodoListItem(content: string) {
        return element(by.cssContainingText('app-root todo-dashboard todo-list mat-list mat-list-item h4', content));
    }

    getTodoListItemDeleteButton(content: string) {
        return this.getTodoListItem(content).getWebElement()
            .findElement(by.xpath('ancestor::mat-list-item'))
            .findElement(by.css('button'));
    }
}
