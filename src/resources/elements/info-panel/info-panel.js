import {customElement, bindable, bindingMode} from 'aurelia-framework';
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Settings} from '../../../services/settings';

@customElement('info-panel')
@inject(Router, Settings)
export class InfoPanel {
  @bindable({defaultBindingMode: bindingMode.twoWay}) selected = null;

  /* Constructor */
  constructor(router, settings) {
    this.settings = settings;
    this.router = router;
    this.languages = JSON.parse(this.settings.data.languages);
    this.models = JSON.parse(this.settings.data.templates);
    this.visitors = JSON.parse(this.settings.data.visitorsGroups);
    this.editors = JSON.parse(this.settings.data.editorsGroups);
  }

  /* Permissions */
  permissions(selected, visitor, data) {
    let flag = false;
    if (selected) {
      if (selected[data].includes(visitor.id)) flag = true;
    }
    return flag;
  }
}
