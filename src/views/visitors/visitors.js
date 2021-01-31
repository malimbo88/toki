import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {bindable, bindingMode} from 'aurelia-framework';
import {Api} from '../../services/api';
import {Settings} from '../../services/settings';

@inject(Router, Api, Settings)
export class Visitors {
  @bindable({defaultBindingMode: bindingMode.twoWay}) selectedGroup = null;
  @bindable({defaultBindingMode: bindingMode.twoWay}) selectedUser = null;
  usersParams = { type: '2', group: false };
  changeGroup = false;
  changeUser = false;

  constructor(router, api, settings) {
    this.router = router;
    this.api = api;
    this.settings = settings;
  }

  selectedGroupChanged(value) {
    if (!value) return;
    this.usersParams = {
      type: '2',
      group: value.id
    }
  }

  selectedUserChanged() {
    let params = { everybody: false };
    this.api.post('getVisitorsGroups', params).then(xhr => {
      this.groups = JSON.parse(xhr.response);
    });
  }

  create(selected) {
    if (selected === 'selectedGroup') {
      this.changeGroup = true;
      this.selectedGroup = null;
    } else if (selected === 'selectedUser') {
        this.changeUser = true;
        this.selectedUser = null;
        let params = { everybody: false };
        this.api.post('getVisitorsGroups', params).then(xhr => {
          this.groups = JSON.parse(xhr.response);
          console.log('groups', this.groups)
        });
    }
  }

  saveGroup(fieldCreate, fieldEdit, selected) {
    let data;
    let params = {};
    if (selected.id) {
      console.log('selected.id')
      if (fieldEdit === 'editGroup') {
        data = fieldEdit;
        params = { 
          id: selected.id,
          type: 2, 
          label: selected.label 
        }
      } else if (fieldEdit === 'editUser') {
        data = fieldEdit;
        console.log('editUser', selected.groups)
        params = {
          name: selected.name,
          username: selected.username,
          locale: 'en_US',
          type: 2,
          groups: [],
          modules: [],
          id: selected.id,
          password: selected.password
        }
        selected.groups.forEach(group => {
          params.groups.push(group.id)
        });
      }
    } else if (!selected.id) {
      if (fieldCreate === 'createGroup') {
        data = fieldCreate;
        params = {
        type: 2,
        label: selected.label
        }
      } else if (fieldCreate === 'createUser') {
        console.log('selectedUser', selected)
        data = fieldCreate;
        params = {
          name: selected.name,
          username: selected.username,
          locale: 'en_US',
          type: 2,
          modules: [],
          groups: [],
          password: selected.password
        }
        selected.groups.forEach(group => {
          params.groups.push(group.id)
        });
      }
    } else {
      console.log("error")
    }
    this.api.post(data, params).then(xhr => {
      this.listVisitorsGroups.load();
      this.listVisitorsUsers.load();
      this.settings.init();
      this.changeUser = false;
      this.selectedUser = null;
      this.changeGroup = false;
      this.selectedGroup = null;
    });
  }

  delete(field, selected) {    
    let params = {
      type: 2,
      id: selected.id
    }
    this.api.post(field, params).then(xhr => {
      if (field === 'deleteUser') {
        this.listVisitorsUsers.load();
        this.settings.init();
        this.changeUser = false;
        this.selectedUser = null;
      } else if (field === 'deleteGroup') {
        this.listVisitorsGroups.load();
        this.settings.init();
        this.changeGroup = false;
        this.selectedGroup = null;
      }
    });
  }
}
