import {customElement, bindable, bindingMode} from 'aurelia-framework';

@customElement('simple-list')
export class SimpleList {
  @bindable() type;
  @bindable({defaultBindingMode: bindingMode.twoWay}) records = null;
}
