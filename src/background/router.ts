import MessageListener from './infrastructures/MessageListener';
import MessageClient from './infrastructures/MessageClient';
import * as messages from '../shared/messages';
import Tab from './domains/Tab';
import CommandController from './controllers/CommandController';
import SettingController from './controllers/SettingController';
import FindController from './controllers/FindController';
import AddonEnabledController from './controllers/AddonEnabledController';
import LinkController from './controllers/LinkController';
import OperationController from './controllers/OperationController';
import MarkController from './controllers/MarkController';

export const registerControllers = () => {
  let settingController = new SettingController();
  let commandController = new CommandController();
  let findController = new FindController();
  let addonEnabledController = new AddonEnabledController();
  let linkController = new LinkController();
  let backgroundOperationController = new OperationController();
  let markController = new MarkController();

  let messageClient = new MessageClient();

  let listener = new MessageListener();
  listener.onMessage(
    (message: messages.Message, sender: Tab): Promise<any> | undefined => {
      switch (message.type) {
      case messages.CONSOLE_QUERY_COMPLETIONS:
        return commandController.getCompletions(message.text);
      case messages.CONSOLE_ENTER_COMMAND:
        return commandController.exec(message.text);
      case messages.SETTINGS_QUERY:
        return settingController.getSetting();
      case messages.FIND_GET_KEYWORD:
        return findController.getKeyword();
      case messages.FIND_SET_KEYWORD:
        return findController.setKeyword(message.keyword);
      case messages.ADDON_ENABLED_RESPONSE:
        return addonEnabledController.indicate(message.enabled);
      case messages.OPEN_TO_TAB:
        return linkController.openToTab(message.url, sender.id);
      case messages.OPEN_NEW_TAB:
        return linkController.openNewTab(
          message.url, sender.id, message.background);
      case messages.BACKGROUND_OPERATION:
        return backgroundOperationController.exec(message.operation);
      case messages.MARK_SET_GLOBAL:
        return markController.setGlobal(message.key, message.x, message.y);
      case messages.MARK_JUMP_GLOBAL:
        return markController.jumpGlobal(message.key);
      case messages.FRAMES_MESSAGE:
        return messageClient.sendMessage(sender.id, message.message);
      }
      return undefined;
    },
  );
};
