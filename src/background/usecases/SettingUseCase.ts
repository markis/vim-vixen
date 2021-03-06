import { injectable } from 'tsyringe';
import PersistentSettingRepository
  from '../repositories/PersistentSettingRepository';
import SettingRepository from '../repositories/SettingRepository';
import { DefaultSettingData } from '../../shared/SettingData';
import Settings from '../../shared/Settings';

@injectable()
export default class SettingUseCase {

  constructor(
    private persistentSettingRepository: PersistentSettingRepository,
    private settingRepository: SettingRepository,
  ) {
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
