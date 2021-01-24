import {inject, customElement, bindable, bindingMode} from 'aurelia-framework';
import {Api} from '../../../services/api';
import {Settings} from '../../../services/settings';

@customElement('simple-list')
@inject(Api, Settings)
export class SimpleList {
  @bindable() type;
  @bindable({defaultBindingMode: bindingMode.twoWay}) selected = null;

  constructor(api, settings) {
    this.api = api;
    this.settings = settings;
  }

  attached() {
    if (this.type.includes('Visitors')) {
      let data = { everybody: false };
      this.load('getVisitorsGroups', data);
    } else if (this.type === 'usersVis') {
      let data = { type: 2, group: false };
      this.load('getUsers', data);
    } else if (this.type.includes('Editors')) {
      let data = { everybody: false };
      this.load('getEditorsGroups', data);
    } else if (this.type === 'usersEdi') {
      let data = { type: '1', group: false };
      this.load('getUsers', data);
    } else if (this.type.includes('Layout')) {
      let data = { hierarchical: false, language: this.settings.selectedLanguage };
      this.load('getTemplates', data);
    } else if (this.type === 'assetsCss') {
      let data = { type: '2', language: this.settings.selectedLanguage, hierarchical: false };
      this.load('getAssets', data);
    } else if (this.type === 'assetsJs') {
      let data = { type: '3', language: this.settings.selectedLanguage, hierarchical: false };
      this.load('getAssets', data); 
    } else {
      this.records = [];
    }  
  }

  load(getService, data) {
    this.api.post(getService, data).then(xhr => {
      let response = JSON.parse(xhr.response);
      this.records = response;
    });
  }

  select(record) {
    this.selected = record;
  }
}
