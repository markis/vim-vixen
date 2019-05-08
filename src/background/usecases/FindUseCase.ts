import FindRepository, { FindRepositoryImpl }
  from '../repositories/FindRepository';
import TabPresenter from '../presenters/TabPresenter';
import ConsoleClient from '../infrastructures/ConsoleClient';

export default class FindUseCase {
  private tabPresenter: TabPresenter;

  private findRepository: FindRepository;

  private consoleClient: ConsoleClient;

  constructor({
    tabPresenter = new TabPresenter(),
    findRepository = new FindRepositoryImpl(),
    consoleClient = new ConsoleClient(),
  } = {}) {
    this.tabPresenter = tabPresenter;
    this.findRepository = findRepository;
    this.consoleClient = consoleClient;
  }

  getKeyword(): Promise<string> {
    return this.findRepository.getKeyword();
  }

  setKeyword(keyword: string): Promise<any> {
    return this.findRepository.setKeyword(keyword);
  }

  async findStart(): Promise<any> {
    let tab = await this.tabPresenter.getCurrent();
    return this.consoleClient.showFind(tab.id);
  }
}
