import { AppPage } from './app.po';

describe('ng-todo-list-example App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display todo list', () => {
    page.navigateTo();
    expect(page.getSiteTitle()).toEqual('Todo list');
  });

  it('should not display user logout action', () => {
    page.navigateTo();
    expect(page.getUserMenu().isPresent()).toBeFalsy();
  });
});
