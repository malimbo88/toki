import {PLATFORM} from 'aurelia-pal';
import {inject} from 'aurelia-framework';
import {Api} from './services/api'

@inject(Api)
export class App {

  /* Constructor */
  constructor(api) {
    this.api = api;
  }

  /* Router */
  configureRouter(config, router) {
    this.router = router;
    config.title = 'Toki';
    config.map([
      {route: '', name: 'auth', moduleId: PLATFORM.moduleName('views/auth/auth'), title: 'Auth'},
      {route: 'home', name: 'home', moduleId: PLATFORM.moduleName('views/home/home'), title: 'Home'},
      {route: 'web-pages', name: 'web-pages', moduleId: PLATFORM.moduleName('views/web-pages/web-pages'), title: 'Web pages'},
      {route: 'objects', name: 'objects', moduleId: PLATFORM.moduleName('views/objects/objects'), title: 'Objects'},
      {route: 'groups-objects', name: 'groups-objects', moduleId: PLATFORM.moduleName('views/groups-objects/groups-objects'), title: 'Groups objects'},
      {route: 'layout', name: 'layout', moduleId: PLATFORM.moduleName('views/layout/layout'), title: 'Layout'},
      {route: 'editors', name: 'editors', moduleId: PLATFORM.moduleName('views/editors/editors'), title: 'Editors'},
      {route: 'visitors', name: 'visitors', moduleId: PLATFORM.moduleName('views/visitors/visitors'), title: 'Visitors'}
    ]);
  }
}
