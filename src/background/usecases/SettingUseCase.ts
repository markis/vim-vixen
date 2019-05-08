// eslint-disable-next-line max-len
import PersistentSettingRepository, { PersistentSettingRepositoryImpl }
  from '../repositories/PersistentSettingRepository';
import SettingRepository, { SettingRepositoryImpl }
  from '../repositories/SettingRepository';
import { DefaultSettingData } from '../../shared/SettingData';
import Settings from '../../shared/Settings';

export default class SettingUseCase {
  private persistentSettingRepository: PersistentSettingRepository;

  private settingRepository: SettingRepository;

  constructor({
    persistentSettingRepository = new PersistentSettingRepositoryImpl(),
    settingRepository = new SettingRepositoryImpl(),
  } = {}) {
    this.persistentSettingRepository = persistentSettingRepository;
    this.settingRepository = settingRepository;
  }

  get(): Promise<Settings> {
    return this.settingRepository.get();
  }

  async reload(): Promise<Settings> {
    let data = await this.persistentSettingRepository.load();
    if (!data) {
      data = DefaultSettingData;
    }

    let value = data.toSettings();
    this.settingRepository.update(value);
    return value;
  }
}
