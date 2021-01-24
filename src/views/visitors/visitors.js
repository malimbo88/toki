import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Api} from '../../services/api';
import {Settings} from '../../services/settings';

@inject(Router, Api, Settings)
export class Visitors {
  selectedVisitorsgroup = null;
  selectedUser = null;

  constructor(router, api, settings) {
    this.router = router;
    this.api = api;
    this.settings = settings;
  }
}
