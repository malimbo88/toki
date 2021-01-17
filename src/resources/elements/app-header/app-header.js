import {inject, customElement, bindable} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Api} from '../../../services/api';

@customElement('app-header')
@inject(Router, Api)
export class AppHeader {
  modules = null;

  /* Constructor */
  constructor(router, api) {
    this.router = router;
    this.api = api;
    this.modules = this.api.authData.modules;
  }

  /* Logout */
  logout() {
    localStorage.clear();
    this.api.authData = null;
    this.router.navigateToRoute('auth');
  }
}
