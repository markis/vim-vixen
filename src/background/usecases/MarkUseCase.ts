import TabPresenter from '../presenters/TabPresenter';
import MarkRepository, { MarkRepositoryImpl }
  from '../repositories/MarkRepository';
import ConsoleClient from '../infrastructures/ConsoleClient';
import ContentMessageClient from '../infrastructures/ContentMessageClient';

export default class MarkUseCase {
  private tabPresenter: TabPresenter;

  private markRepository: MarkRepository;

  private consoleClient: ConsoleClient;

  private contentMessageClient: ContentMessageClient;

  constructor({
    tabPresenter = new TabPresenter(),
    markRepository = new MarkRepositoryImpl(),
    consoleClient = new ConsoleClient(),
    contentMessageClient = new ContentMessageClient(),
  } = {}) {
    this.tabPresenter = tabPresenter;
    this.markRepository = markRepository;
    this.consoleClient = consoleClient;
    this.contentMessageClient = contentMessageClient;
  }

  async setGlobal(key: string, x: number, y: number): Promise<any> {
    let tab = await this.tabPresenter.getCurrent();
    let mark = { tabId: tab.id, url: tab.url as string, x, y };
    return this.markRepository.setMark(key, mark);
  }

  async jumpGlobal(key: string): Promise<any> {
    let current = await this.tabPresenter.getCurrent();

    let mark = await this.markRepository.getMark(key);
    if (!mark) {
      return this.consoleClient.showError(
        current.id, 'Mark is not set');
    }
    try {
      await this.contentMessageClient.scrollTo(mark.tabId, mark.x, mark.y);
      return this.tabPresenter.select(mark.tabId);
    } catch (e) {
      let tab = await this.tabPresenter.create(mark.url);
      return this.markRepository.setMark(key, {
        tabId: tab.id, url: mark.url, x: mark.x, y: mark.y,
      });
    }
  }
}
