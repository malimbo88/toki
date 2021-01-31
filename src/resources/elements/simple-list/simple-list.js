import {inject, customElement, bindable, bindingMode} from 'aurelia-framework';
import {Api} from '../../../services/api';
import {Settings} from '../../../services/settings';

@customElement('simple-list')
@inject(Api, Settings)
export class SimpleList {
  @bindable() type = null;
  @bindable({defaultBindingMode: bindingMode.twoWay}) selected = null;

  constructor(api, settings) {
    this.api = api;
    this.settings = settings;
  }

  selectedChanged() {
    if (this.selected.label) {
      this.userGroups = [];
      this.records.users.forEach(user => {
        user.groups.forEach(group => {
          if (group.label === this.selected.label) {
            this.userGroups.push(user);
          }
        });
      });
    }
  }

  attached() {
    if (this.type === 'visitorsGroups' || this.type === 'users') {
      Promise.all([
        this.api.post('getVisitorsGroups', { everybody: false }),
        this.api.post('getUsers', { type: 2, group: false })
      ]).then(success => {
        let response = {
          visitorsGroups: JSON.parse(success[0].response),
          users: JSON.parse(success[1].response)
        };
        this.records = response;
        console.log(this.records)
      });
    }  

    /*     } else if (this.type.includes('Editors')) {
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
      this.records = []; */
  }

  select(record) {
    this.selected = record;
  }
}
