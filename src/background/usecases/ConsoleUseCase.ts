import TabPresenter from '../presenters/TabPresenter';
import ConsoleClient from '../infrastructures/ConsoleClient';

export default class ConsoleUseCase {
  private tabPresenter: TabPresenter;

  private consoleClient: ConsoleClient;

  constructor({
    tabPresenter = new TabPresenter(),
    consoleClient = new ConsoleClient(),
  } = {}) {
    this.tabPresenter = tabPresenter;
    this.consoleClient = consoleClient;
  }

  async showCommand(): Promise<any> {
    let tab = await this.tabPresenter.getCurrent();
    return this.consoleClient.showCommand(tab.id, '');
  }

  async showOpenCommand(alter: boolean): Promise<any> {
    let tab = await this.tabPresenter.getCurrent();
    let command = 'open ';
    if (alter) {
      command += tab.url || '';
    }
    return this.consoleClient.showCommand(tab.id, command);
  }

  async showTabopenCommand(alter: boolean): Promise<any> {
    let tab = await this.tabPresenter.getCurrent();
    let command = 'tabopen ';
    if (alter) {
      command += tab.url || '';
    }
    return this.consoleClient.showCommand(tab.id, command);
  }

  async showWinopenCommand(alter: boolean): Promise<any> {
    let tab = await this.tabPresenter.getCurrent();
    let command = 'winopen ';
    if (alter) {
      command += tab.url || '';
    }
    return this.consoleClient.showCommand(tab.id, command);
  }

  async showBufferCommand(): Promise<any> {
    let tab = await this.tabPresenter.getCurrent();
    let command = 'buffer ';
    return this.consoleClient.showCommand(tab.id, command);
  }

  async showAddbookmarkCommand(alter: boolean): Promise<any> {
    let tab = await this.tabPresenter.getCurrent();
    let command = 'addbookmark ';
    if (alter) {
      command += tab.title || '';
    }
    return this.consoleClient.showCommand(tab.id, command);
  }

  async hideConsole(): Promise<any> {
    let tab = await this.tabPresenter.getCurrent();
    return this.consoleClient.hide(tab.id);
  }
}
