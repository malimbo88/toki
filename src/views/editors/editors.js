import {inject, bindable, bindingMode} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Api} from '../../services/api';
import {Settings} from '../../services/settings';

@inject(Router, Api, Settings)
export class Editors {
  @bindable({defaultBindingMode: bindingMode.twoWay}) records = null;
  groups = [];
  users = [];
  selected = null;

  constructor(router, api, settings) {
    this.router = router;
    this.api = api;
    this.settings = settings;
  }

  attached() {
    this.init();
  }

  init() {
    Promise.all([
      this.api.post('getEditorsGroups', { everybody: false }),
      this.api.post('getUsers', { type: '1', group: false })
    ]).then(success => {
      this.groups = JSON.parse(success[0].response);
      this.users = JSON.parse(success[1].response);
    });
  }
}
