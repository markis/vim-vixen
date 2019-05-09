import { Message, valueOf } from '../../shared/messages';

export default class MessageClient {
  async sendMessage(tabId: number, msg: Message): Promise<Message> {
    let received = await browser.tabs.sendMessage(tabId, msg);
    return valueOf(received);
  }
}
