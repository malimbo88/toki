import {inject} from 'aurelia-framework';
import {Api} from './api';

@inject(Api)
export class Settings {
  selectedLanguage = null;

  constructor(api) {
    this.api = api;
    this._data = JSON.parse(localStorage.getItem('settings')) || null;
    if (!this._data) {
      this._data = {
        templates: null,
        languages: [],
        visitorsGroups: null,
        editorsGroups: null,
        users: null,
        selectedLanguage: '1'
      };
      this.init();
    }
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
      this.api.post('getTemplates', { wrapper: false }),
      this.api.post('getLanguages', null),
      this.api.post('getVisitorsGroups', { everybody: true }),
      this.api.post('getEditorsGroups', ''),
      this.api.post('getUsers', '')
    ]).then(success => {
      let settings = {
        templates: JSON.parse(success[0].response),
        languages: Object.values(JSON.parse(success[1].response)),
        visitorsGroups: JSON.parse(success[2].response),
        editorsGroups: JSON.parse(success[3].response),
        users: JSON.parse(success[4].response),
      };
      this.data = settings;
    });
  }
}
