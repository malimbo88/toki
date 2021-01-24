import {inject, bindable, bindingMode} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Api} from '../../services/api';
import {Settings} from '../../services/settings';

@inject(Router, Api, Settings)
export class Objects {
  selected = null;
  objectGroups = [];
  selectedObject = null;
  
  /* Constructor */
  constructor(router, api, settings) {
    this.router = router;
    this.api = api;
    this.settings = settings;
  }

  /* Attached */
  attached() {
    this.api.post('getContentItems', { type: '2', parent: 0 }).then(xhr => {
      let response = JSON.parse(xhr.response);
      this.objectGroups = response;
    });
  }

  selectObjectGroup(record) {
    this.parent = record;
  }

  select(record) {
    this.selected = record;
  }
}
