import * as urls from '../../shared/urls';

declare namespace browser.browserSettings.homepageOverride {

  type BrowserSettings = {
    value: string;
    levelOfControl: LevelOfControlType;
  };

  type LevelOfControlType =
    'not_controllable' |
    'controlled_by_other_extensions' |
    'controllable_by_this_extension' |
    'controlled_by_this_extension';

  function get(param: object): Promise<BrowserSettings>;
}

export default interface BrowserSettingRepository {
  getHomepageUrls(): Promise<string[]>;

  // eslint-disable-next-line semi
}

export class BrowserSettingRepositoryImpl implements BrowserSettingRepository {
  async getHomepageUrls(): Promise<string[]> {
    let { value } = await browser.browserSettings.homepageOverride.get({});
    return value.split('|').map(urls.normalizeUrl);
  }
}
