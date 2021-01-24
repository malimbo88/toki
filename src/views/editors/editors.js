import {inject, bindable, bindingMode} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Api} from '../../services/api';
import {Settings} from '../../services/settings';

@inject(Router, Api, Settings)
export class Editors {
  selectedEditorsGroup = null;
  selectedUser = null;

  constructor(router, api, settings) {
    this.router = router;
    this.api = api;
    this.settings = settings;
  }
}
