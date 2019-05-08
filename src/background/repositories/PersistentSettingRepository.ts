import SettingData from '../../shared/SettingData';

export default interface PersistentSettingRepository {
  load(): Promise<SettingData | null>;

  // eslint-disable-next-line semi
}

export class PersistentSettingRepositoryImpl
implements PersistentSettingRepository {

  async load(): Promise<SettingData | null> {
    let { settings } = await browser.storage.local.get('settings');
    if (!settings) {
      return null;
    }
    return SettingData.valueOf(settings as any);
  }
}

