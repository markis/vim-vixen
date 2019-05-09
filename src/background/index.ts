import { registerControllers } from './router';
import SettingController from './controllers/SettingController';
import VersionController from './controllers/VersionController';

let settingController = new SettingController();
settingController.reload();

browser.runtime.onInstalled.addListener((details) => {
  if (details.reason !== 'install' && details.reason !== 'update') {
    return;
  }
  new VersionController().notify();
});

registerControllers();
browser.storage.onChanged.addListener((changes, area) => {
  if (area !== 'local') {
    return;
  }
  if (changes.settings) {
    settingController.reload();
  }
});
