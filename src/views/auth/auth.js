import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Api} from '../../services/api';
import {Settings} from '../../services/settings';

@inject(Router, Api, Settings)
export class Auth {
  username = null;
  password = null;
  errorMessage = null;

  constructor(router, api, settings) {
    this.router = router;
    this.api = api;
    this.settings = settings;
  }

  activate() {
    this.errorMessage = false;
  }

  login() {
    let data = { username: this.username, password: this.password };  
    this.api.post('userLogin', data).then(xhr => {
      this.api.authData = JSON.parse(xhr.response);
      this.router.navigateToRoute('home');
    }).catch(error => {
      this.errorMessage = true;
    });
  }
}
