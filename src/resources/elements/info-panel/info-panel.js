import {customElement, bindable, bindingMode} from 'aurelia-framework';
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Settings} from '../../../services/settings';

@customElement('info-panel')
@inject(Router, Settings)
export class InfoPanel {
  @bindable({defaultBindingMode: bindingMode.twoWay}) selected = null;

  constructor(router, settings) {
    this.settings = settings;
    this.router = router;
    
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
}
