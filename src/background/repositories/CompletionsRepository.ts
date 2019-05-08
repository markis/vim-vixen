import Tab from '../domains/Tab';
import Bookmark from '../domains/Bookmark';
import History from '../domains/History';

export default interface CompletionsRepository {
  queryBookmarks(keywords: string): Promise<Bookmark[]>;

  queryHistories(keywords: string): Promise<History[]>;

  queryTabs(keywords: string, excludePinned: boolean): Promise<Tab[]>;

  // eslint-disable-next-line semi
}

export class CompletionsRepositoryImpl implements CompletionsRepository {
  async queryBookmarks(keywords: string): Promise<Bookmark[]> {
    let items = await browser.bookmarks.search({ query: keywords });
    return items.filter((item) => {
      if (!item.url) {
        return false;
      }
      let url = undefined;
      try {
        url = new URL(item.url);
      } catch (e) {
        return false;
      }
      return item.type === 'bookmark' && url.protocol !== 'place:';
    }).map(item => ({ url: item.url!!, ...item }));
  }

  async queryHistories(keywords: string): Promise<History[]> {
    let items = await browser.history.search({
      text: keywords,
      startTime: 0,
    });
    return items
      .filter(item => item.url !== undefined)
      .map(item => ({ url: item.url!!, ...item }));
  }

  async queryTabs(keywords: string, excludePinned: boolean): Promise<Tab[]> {
    let tabs = await browser.tabs.query({ currentWindow: true });
    return tabs.filter((t) => {
      return t.url && t.url.toLowerCase().includes(keywords.toLowerCase()) ||
        t.title && t.title.toLowerCase().includes(keywords.toLowerCase());
    }).filter((t) => {
      return !(excludePinned && t.pinned);
    }).map(t => ({ ...t, id: t.id!! }));
  }
}
