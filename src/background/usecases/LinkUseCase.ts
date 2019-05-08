import TabPresenter from '../presenters/TabPresenter';

export default class LinkUseCase {
  private tabPresenter: TabPresenter;

  constructor({
    tabPresenter = new TabPresenter(),
  } = {}) {
    this.tabPresenter = tabPresenter;
  }

  openToTab(url: string, tabId: number): Promise<any> {
    return this.tabPresenter.open(url, tabId);
  }

  openNewTab(url: string, openerId: number, background: boolean): Promise<any> {
    return this.tabPresenter.create(url, {
      openerTabId: openerId, active: !background
    });
  }
}
