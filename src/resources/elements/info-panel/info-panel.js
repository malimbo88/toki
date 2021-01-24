import {customElement, bindable, bindingMode} from 'aurelia-framework';
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Api} from '../../../services/api';
import {Settings} from '../../../services/settings';

@customElement('info-panel')
@inject(Router, Api, Settings)
export class InfoPanel {
  @bindable({defaultBindingMode: bindingMode.twoWay}) selected = null;
  statusOptions = ['visible', 'invisible', 'disabled'];
  selectedStatus = null;
  urlChanged = null;

  constructor(router, api, settings) {
    this.api = api;
    this.settings = settings;
    this.router = router;  
  }

  selectedChanged() {
    this.selectedStatus = null;
  }

  attached() {
    this.languages = this.settings.data.languages;
    this.models = this.settings.data.templates;
    this.visitors = this.settings.data.visitorsGroups;
    this.editors = this.settings.data.editorsGroups;
  }

  permissions(selected, visitor, data) {
    let flag = false;
    if (selected) {
      if (selected[data].includes(visitor.id)) flag = true;
    }
    return flag;
  }

  change(field) {
    if (!this.selected || !this.selected[field]) return;
    let params = { id: this.selected.id };

    /* Label */
    if (field === 'label') {
      params.type = this.selected.type;
      params.data = {};
      params.data[field] = this.selected[field];
      params.parent = this.selected.parent;
      params.language = this.settings.selectedLanguage;
      this.api.post('updateContentData', params);
      params = { id: this.selected.id };
    }

    /* Visibility */
    if (field === 'status') {
      params.data = {};
      params.data[field] = this.selectedStatus;
      this.api.post('updateContentData', params);
      params = { id: this.selected.id };
    }

    this.api.post('buildRecursiveUrl', {
      id: this.selected.id, 
      language: this.settings.selectedLanguage 
    }).then(xhr => {
      if (field === 'label') this.urlChanged = xhr.response;     
    });
  }
}
