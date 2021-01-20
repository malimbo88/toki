import {inject} from 'aurelia-framework';
import {Settings} from '../../services/settings';

@inject(Settings)
export class GroupsObjects {
  groups = [];
  users = [];
  selected = null;

  constructor(settings) {
    this.settings = settings;
  }
}
