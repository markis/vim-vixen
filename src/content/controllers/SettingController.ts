import { injectable } from 'tsyringe';
import AddonEnabledUseCase from '../usecases/AddonEnabledUseCase';
import SettingUseCase from '../usecases/SettingUseCase';
import * as blacklists from '../../shared/blacklists';

import * as messages from '../../shared/messages';

@injectable()
export default class SettingController {

  constructor(
    private addonEnabledUseCase: AddonEnabledUseCase,
    private settingUseCase: SettingUseCase,
  ) {
  }

  async initSettings(): Promise<void> {
    try {
      let current = await this.settingUseCase.reload();
      let disabled = blacklists.includes(
        current.blacklist, window.location.href,
      );
      if (disabled) {
        this.addonEnabledUseCase.disable();
      } else {
        this.addonEnabledUseCase.enable();
      }
    } catch (e) {
      // Sometime sendMessage fails when background script is not ready.
      console.warn(e);
      setTimeout(() => this.initSettings(), 500);
    }
  }

  async reloadSettings(_message: messages.Message): Promise<void> {
    await this.settingUseCase.reload();
  }
}
