import Settings, { DefaultSetting } from '../../shared/Settings';

let current: Settings = DefaultSetting;

export default interface SettingRepository {
  set(setting: Settings): void;

  get(): Settings;
}

export class SettingRepositoryImpl implements SettingRepository {
  set(setting: Settings): void {
    current = setting;
  }

  get(): Settings {
    return current;
  }
}
