import {inject, customElement, bindable, bindingMode} from 'aurelia-framework';
import {Api} from '../../../services/api';
import {Settings} from '../../../services/settings';

@customElement('form-panel')
@inject(Api, Settings)
export class FormPanel {
  @bindable() type = null;
  @bindable({defaultBindingMode: bindingMode.twoWay}) editSelected = null;
  @bindable({defaultBindingMode: bindingMode.twoWay}) request = null;
  fieldGroups = null;
  fields = null;
  selectedTab = null;
  newLabel = null;
  newFieldset = null;
  newTemplate = null;

  constructor(api, settings) {
    this.api = api;
    this.settings = settings;
  }

  attached() {
    this.init();
    console.log(this.editSelected)
  }

  selectTab(id) {
    this.selectedTab = id;
  }

  init() {
    let params = { fieldset: this.editSelected.fieldset };
    Promise.all([
      this.api.post('getFieldgroups', params),
      this.api.post('getFields', params)
    ]).then(success => {
      this.fieldGroups = JSON.parse(success[0].response);
      this.fieldGroups.unshift({id: "0", label: 'Info'});
      this.fields = JSON.parse(success[1].response);
      this.selectedTab = "0";
    });

    if (!this.editSelected.id) {
      params = { type: this.editSelected.type }
      this.api.post('getFieldsets', params).then(xhr => {
        this.fieldsets = JSON.parse(xhr.response);
      })
    }
  }

  save() {
    let data = '';
    let params = {
      type: this.editSelected.type,
    }

    if (this.editSelected.id) {
      data = 'updateContentData';
      params = {
        id: this.editSelected.id,
        language: this.settings.selectedLanguage,
        data: {
          "label": this.editSelected.label,
          "contenuto": "",
          "meta title": this.editSelected['meta title'], 
          "meta description": this.editSelected['meta description']
        }
      }
      this.api.post(data, params);

    } else {
      data = 'createContent';
      params = {
        parent: this.editSelected.parent, 
        type: this.editSelected.type,
        label: this.newLabel,
        fieldset: this.newFieldset,
        template: this.newTemplate,
        status: "disabled"
      };
      this.api.post(data, params);
    }
  }

  close() {
    this.editSelected = null;
  }
}