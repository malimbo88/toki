import {customElement, bindable, bindingMode} from 'aurelia-framework';
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Api} from '../../../services/api';
import {Settings} from '../../../services/settings';

@customElement('info-panel')
@inject(Router, Api, Settings)
export class InfoPanel {
  @bindable({defaultBindingMode: bindingMode.twoWay}) selected = null;
  @bindable({defaultBindingMode: bindingMode.twoWay}) editSelected = null;
  @bindable({defaultBindingMode: bindingMode.twoWay}) request = null;
  statusOptions = ['visible', 'invisible', 'disabled'];

  constructor(router, api, settings) {
    this.api = api;
    this.settings = settings;
    this.router = router;  
    this.visitors = this.settings.data.visitorsGroups;
    this.editors = this.settings.data.editorsGroups;
  }

  attached() {
    this.languages = this.settings.data.languages;
    this.models = this.settings.data.templates;
  }

  edit(selected) {
    this.editSelected = selected;
  }

  new(selected) {
    this.editSelected = {
      id: null,
      parent: selected.id,
      type: selected.type,
      fieldset: selected.fieldset,
      label: selected.label
    };
  }

  selectedChanged(newValue, oldValue) {
    if (!newValue || newValue === oldValue) return;

    /* _visitorsGroups */
    this.selected._visitorsGroups = [];
    this.settings.data.visitorsGroups.forEach(group => {
      group.checked = this.selected.visitorsGroups.includes(group.id);
      this.selected._visitorsGroups.push(group);
    });

    /* _editorsGroups */
    this.selected._editorsGroups = [];
    this.settings.data.editorsGroups.forEach(group => {
      group.checked = this.selected.editorsGroups.includes(group.id);
      this.selected._editorsGroups.push(group);
    });
    let flag = false;
    for (let group of this.selected._editorsGroups) {
      if (group.id === '0' && group.checked) {
        group.disabled = false; 
        flag = true;
      }
      else if (group.id !== '0' && flag) {
        group.disabled = true;
      }
      else if (group.id !== '0' && !flag) {
        group.disabled = false;
      }
    }
  }

  update(field) {
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
      params.data[field] = this.selected[field];
      this.api.post('updateContent', params);
      params = { id: this.selected.id };
    }

    /* Model */
    if (field === 'template') {
      params.data = {};
      params.data[field] = this.selected[field];
      this.api.post('updateContent', params);
      params = { id: this.selected.id };
    }

    /* Visitors */
    if (field === 'visitorsGroups') {
      params = { id: this.selected.id, group: field };
      params.data = this.selected._visitorsGroups.filter(x => x.checked === true).map(x => x.id);
      this.api.post('updateContentPermissions', params).then(xhr => {
        this.selected.visitorsGroups = params.data;
      });
    }

    /* Editors */
    if (field === 'editorsGroups') {
      params = { id: this.selected.id, group: field };
      params.data = this.selected._editorsGroups.filter(x => x.checked === true).map(x => x.id);
      this.api.post('updateContentPermissions', params);
    }

    this.api.post('buildRecursiveUrl', {
      id: this.selected.id, 
      language: this.settings.selectedLanguage 
    }).then(xhr => {
      if (field === 'label') this.selected.url = xhr.response;     
    });
  }

  delete() {
    let params = {
      type: this.selected.type,
      id: this.selected.id
    }
    this.api.post('deleteContent', params);
  }
  
  copyUrl(url) {
    navigator.clipboard.writeText(url);
  }
}
