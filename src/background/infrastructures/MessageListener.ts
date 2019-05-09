import Tab from '../domains/Tab';
import { Message, valueOf } from '../../shared/messages';

type Listener = (msg: Message, sender: Tab) => Promise<any> | undefined;

export default class ContentMessageListener {
  onMessage(listener: Listener): void {
    browser.runtime.onMessage.addListener(
      (msg: any, sender: browser.runtime.MessageSender): any => {
        if (!sender.tab) {
          return;
        }
        try {
          return listener(
            valueOf(msg),
            { ...sender.tab!!, id: sender.tab.id!! },
          );
        } catch (e) {
          console.error(e);
        }
      },
    );
  }
}

