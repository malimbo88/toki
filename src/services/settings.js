import {inject} from 'aurelia-framework';
import {Api} from './api';

@inject(Api)
export class Settings {
  constructor(api) {
    this.api = api;
    this._data = JSON.parse(localStorage.getItem('settings')) || null;
    if (!this._data) this.init();
  }

  get data() {
    return this._data;
  }

  set data(value) {
    this._data = value || null;
    if (value) localStorage.setItem('settings', JSON.stringify(value));
    else localStorage.removeItem('settings');
  }
  
  init() {
    Promise.all([
      this.api.post('getTemplates', ''),
      this.api.post('getLanguages', ''),
      this.api.post('getVisitorsGroups', ''),
      this.api.post('getEditorsGroups', ''),
    ]).then(success => {
      let settings = {
        templates: success[0].response,
        languages: success[1].response,
        visitorsGroups: success[2].response,
        editorsGroups: success[3].response
      };
      this.data = settings;
    });
  }
}
