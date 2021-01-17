import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Api} from '../../services/api';
import {Settings} from '../../services/settings';

@inject(Router, Api, Settings)
export class Index {
  selected = null;
  type = null;
  languages = null;
  
  /* Constructor */
  constructor(router, api, settings) {
    this.router = router;
    this.api = api;
    this.settings = settings;
    this.languages = JSON.parse(this.settings.data.languages);
  }
}
