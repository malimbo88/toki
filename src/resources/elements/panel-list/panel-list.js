import {inject, customElement, bindable, bindingMode} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Api} from '../../../services/api';

@customElement('panel-list')
@inject(Router, Api)
export class PanelList {
  @bindable() type;
  @bindable() parent;
  @bindable({defaultBindingMode: bindingMode.twoWay}) selected = null;
  records = null;

  constructor(router, api) {
    this.router = router;
    this.api = api;
  }

  attached() {
    if (this.type === "1") {
      // Deve caricare pagine web, con visualizzazione ad albero
      this.load();
    } else if (this.type === "2") {
      // Deve caricare i gruppi di oggetti
      this.load();
    } else if (this.type === "3" && this.fieldset) {
      // Deve caricare gli oggetti, con colonne personalizzate
      this.api.post('getFields', { fieldset: this.fieldset, intable: true }).then(xhr => {
        let response = JSON.parse(xhr.response);
        this.fields = response;
      });
    } else {
      this.records = [];
    }  
  }

  load() {
    this.api.post('getContentItems', { type: this.type, parent: this.parent }).then(xhr => {
      let response = JSON.parse(xhr.response);
      this.records = response;
      console.log(this.records)
    });
  }

  select(record) {
    this.selected = record;
  }
}
