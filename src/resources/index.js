export function configure(config) {
  config.globalResources([PLATFORM.moduleName('./elements/app-header/app-header')]);
  config.globalResources([PLATFORM.moduleName('./elements/info-panel/info-panel')]);
  config.globalResources([PLATFORM.moduleName('./elements/panel-list/panel-list')]);
  config.globalResources([PLATFORM.moduleName('./elements/simple-list/simple-list')]);
  config.globalResources([PLATFORM.moduleName('./elements/form-panel/form-panel')]);
}
