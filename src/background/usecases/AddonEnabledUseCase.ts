import IndicatorPresenter from '../presenters/IndicatorPresenter';
import TabPresenter from '../presenters/TabPresenter';
import ContentMessageClient from '../infrastructures/ContentMessageClient';

export default class AddonEnabledUseCase {
  private indicatorPresentor: IndicatorPresenter;

  private tabPresenter: TabPresenter;

  private contentMessageClient: ContentMessageClient;

  constructor({
    indicatorPresentor = new IndicatorPresenter(),
    tabPresenter = new TabPresenter(),
    contentMessageClient = new ContentMessageClient(),
  } = {}) {
    this.indicatorPresentor = indicatorPresentor;
    this.indicatorPresentor.onClick((tab) => {
      if (tab.id) {
        this.onIndicatorClick(tab.id);
      }
    });

    this.tabPresenter = tabPresenter;
    this.tabPresenter.onSelected(info => this.onTabSelected(info.tabId));

    this.contentMessageClient = contentMessageClient;
  }

  indicate(enabled: boolean): Promise<void> {
    return this.indicatorPresentor.indicate(enabled);
  }

  onIndicatorClick(tabId: number): Promise<void> {
    return this.contentMessageClient.toggleAddonEnabled(tabId);
  }

  async onTabSelected(tabId: number): Promise<void> {
    let enabled = await this.contentMessageClient.getAddonEnabled(tabId);
    return this.indicatorPresentor.indicate(enabled);
  }
}
