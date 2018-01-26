import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getSiteTitle() {
    return element(by.css('app-root .app-title')).getText();
  }

  getUserMenu() {
    return element(by.css('app-root .app-user-actions'));
  }
}
