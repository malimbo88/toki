import {inject, customElement, bindable, bindingMode} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Api} from '../../../services/api';
import {Settings} from '../../../services/settings';

@customElement('panel-list')
@inject(Router, Api, Settings)
export class PanelList {
  @bindable() type;
  @bindable() parent;
  @bindable() pagination = false;
  @bindable({defaultBindingMode: bindingMode.twoWay}) selected = null;
  @bindable() limit = 25;
  offset = 0;
  count = 0;
  pages = 0;
  total = 0;

  constructor(router, api, settings) {
    this.router = router;
    this.api = api;
    this.settings = settings;
  }

  parentChanged(newValue, oldValue) {
    if (newValue === oldValue) return;
    this.offset = 0;
    this.load();
  }

  limitChanged() {
    this.offset = 0;
    this.load();
  }

  load() {
    let data = { 
      type: this.type,
      parent: this.parent.id,
      language: this.settings.selectedLanguage
    };

    let promises = [];
    if (this.pagination) {
      data.offset = this.offset;
      data.limit = this.limit; 
      data.paging = true;
      data.offset = this.offset;
      data.intable = true;
      promises.push(this.api.post('getFields', { fieldset: parseInt(this.parent.fieldset, 10), intable: "true" }).then(xhr => {
        this.fields = JSON.parse(xhr.response);
      }));
    }

    Promise.all(promises).then(success => {
      this.api.post('getContentItems', data).then(xhr => {
        let response = JSON.parse(xhr.response);
        
        if (this.pagination) {
          this.total = response.total;
          this.count = response.count;
          this.pages = parseInt(response.pages, 10);
          this.records = response.items;
          this.page = Math.ceil(this.pages - ((this.total - this.offset) / parseInt(this.limit, 10)));
        } else {
          response.forEach(item => {
            item = Object.assign(item, item.data);
            delete(item.data);
          });
          this.records = response;
        }
      });
    });
  }

  select(record) {
    this.selected = record;
  }

  paginate(direction) {
    if (direction === 'up') {
      if (this.page === 1) return;
      this.offset -= parseInt(this.limit, 10);
      this.load();
    } else if (direction === 'down') {
      if (this.page === this.pages) return;
      this.offset += parseInt(this.limit, 10);
      this.load();
    }
  }
}
