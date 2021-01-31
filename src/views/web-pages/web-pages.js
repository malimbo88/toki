import {inject, bindable, bindingMode} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Api} from '../../services/api';
import {Settings} from '../../services/settings';

@inject(Router, Api, Settings)
export class Index {
  @bindable({defaultBindingMode: bindingMode.twoWay}) editSelected = null;
  @bindable({defaultBindingMode: bindingMode.twoWay}) request = null;
  selected = null;
  
  constructor(router, api, settings) {
    this.router = router;
    this.api = api;
    this.settings = settings;
  }

  requestChanged(value) {
    console.log('request', value);
  }
}
