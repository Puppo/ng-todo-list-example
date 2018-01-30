import { HttpClient } from '@angular/common/http';
import { element } from 'protractor';
import { Validators } from '@angular/forms';
import { AppPage } from './todos.po';
import { inject } from '@angular/core/testing';

describe('ng-todo-list-example App Todos', () => {
  let page: AppPage;
  const mail = 'test@test.eu';
  const pwd = '123456';

  describe('user login', () => {

    beforeEach(() => {
      page = new AppPage();
    });

    it('should navigate to login page', () => {
      page.navigateToLogin();
      page.browser();
      page.browser().driver.sleep(500);
      page.browser().waitForAngular();
      expect(page.browser().getCurrentUrl()).toEqual(`${page.browser().baseUrl}/auth/login`);
    });

    it('should not display user logout action', () => {
      page.navigateToLogin();
      page.browser().driver.sleep(500);
      page.browser().waitForAngular();
      expect(page.getUserMenu().isPresent()).toBeFalsy();
    });

    it('should user access', () => {
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

  describe('check if elements exist', () => {

    beforeAll(() => {
      page = new AppPage();
      page.navigateToTodos();
    });

    it('should display description input', () => {
      expect(page.getTodosDescriptionInput().isPresent()).toBeTruthy();
    });

    it('should display due date input', () => {
      expect(page.getTodosDueDateInput().isPresent()).toBeTruthy();
    });

    it('should display button input', () => {
      expect(page.getTodosAddButton().isPresent()).toBeTruthy();
    });

  });

  describe('inputs and errors', () => {

    beforeAll(() => {
      page = new AppPage();
      page.navigateToTodos();
    });

    beforeEach(() => {
      page.getTodosDescriptionInput().clear();
      page.getTodosDueDateInput().clear();
    });

    it('should show description required error', () => {
      page.getTodosAddButton().click();
      page.browser().driver.sleep(500);
      expect(page.getTodosDescriptionInputRequireError().isPresent()).toBeTruthy();
    });

    it('should date be set by calendar', () => {
      const today = new Date();

      page.getTodosCalendarButton().click();
      page.browser().driver.sleep(500);
      page.getTodosCalendarToday().click();
      page.browser().driver.sleep(500);
      expect(page.getTodosDueDateInput()
        .getAttribute('value')).toBe(`${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`);
    });

    // TODO: aggiungere validatori  due date
    // it('should show date error', () => {
    //   page.getTodosDescriptionInput().sendKeys('test');
    //   page.getTodosAddButton().click();
    //   expect(page.getTodosDescriptionInputRequireError().isPresent()).toBeTruthy();
    // });
  });

  describe('operations', () => {

    const item = {
      content: `test_${Date.now()}`,
      dueDate: '01/01/2019'
    };

    beforeAll(() => {
      page = new AppPage();
      page.navigateToTodos();
    });

    beforeEach(() => {
      page.getTodosDescriptionInput().clear();
      page.getTodosDueDateInput().clear();
    });

    it('should create new item on add click', () => {
      page.getTodoListItems().count().then((c) => {
        page.getTodosDescriptionInput().sendKeys(item.content);
        page.getTodosDueDateInput().sendKeys(item.dueDate);
        page.getTodosAddButton().click();
        page.browser().driver.sleep(500);
        expect(page.getTodoListItems().count()).toBe(c + 1);
        expect(page.getTodoListItem(item.content).isPresent()).toBeTruthy();
      });
    });

    it('should remove item on delete click', () => {
      page.getTodoListItemDeleteButton(item.content).click();
      page.browser().driver.sleep(500);
      expect(page.getTodoListItem(item.content).isPresent()).toBeFalsy();
    });
  });
});



