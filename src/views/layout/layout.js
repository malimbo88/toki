import {inject, bindable, bindingMode} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Api} from '../../services/api';
import {Settings} from '../../services/settings';

@inject(Router, Api, Settings)
export class Layout {
  assetsCss = [];
  assetsJs = [];
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
      this.api.post('getTemplates', ''),
      this.api.post('getAssets', { type: '2', language: this.settings.selectedLanguage, hierarchical: false }),
      this.api.post('getAssets', { type: '3', language: this.settings.selectedLanguage, hierarchical: false })
    ]).then(success => {
      this.groups = JSON.parse(success[0].response);
      this.assetsCss = JSON.parse(success[1].response);
      this.assetsJs = JSON.parse(success[2].response);
    });
  }
}
