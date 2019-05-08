import MemoryStorage from '../infrastructures/MemoryStorage';
import Tab from '../domains/Tab';

const CURRENT_SELECTED_KEY = 'tabs.current.selected';
const LAST_SELECTED_KEY = 'tabs.last.selected';

export default class TabPresenter {
  async open(url: string, tabId?: number): Promise<Tab> {
    let tab = await browser.tabs.update(tabId, { url });
    return { ...tab, id: tab.id!! };
  }

  async create(url: string, opts?: object): Promise<Tab> {
    let tab = await browser.tabs.create({ url, ...opts });
    return { ...tab, id: tab.id!! };
  }

  async getCurrent(): Promise<Tab> {
    let tabs = await browser.tabs.query({
      active: true, currentWindow: true
    });
    return { ...tabs[0], id: tabs[0].id!! };
  }

  async getAll(): Promise<Tab[]> {
    let tabs = await browser.tabs.query({ currentWindow: true });
    return tabs.map(tab => ({ ...tab, id: tab.id!! }));
  }

  async getLastSelectedId(): Promise<number | undefined> {
    let cache = new MemoryStorage();
    let tabId = await cache.get(LAST_SELECTED_KEY);
    if (tabId === null || typeof tabId === 'undefined') {
      return;
    }
    return tabId;
  }

  async getByKeyword(keyword: string, excludePinned = false): Promise<Tab[]> {
    let tabs = await browser.tabs.query({ currentWindow: true });
    return tabs.filter((t) => {
      return t.url && t.url.toLowerCase().includes(keyword.toLowerCase()) ||
        t.title && t.title.toLowerCase().includes(keyword.toLowerCase());
    }).filter((t) => {
      return !(excludePinned && t.pinned);
    }).map(t => ({ ...t, id: t.id!! }));
  }

  async select(tabId: number): Promise<void> {
    await browser.tabs.update(tabId, { active: true });
  }

  remove(ids: number[]): Promise<void> {
    return browser.tabs.remove(ids);
  }

  async reopen(): Promise<any> {
    let window = await browser.windows.getCurrent();
    let sessions = await browser.sessions.getRecentlyClosed();
    let session = sessions.find((s) => {
      return s.tab && s.tab.windowId === window.id;
    });
    if (!session) {
      return;
    }
    if (session.tab && session.tab.sessionId) {
      return browser.sessions.restore(session.tab.sessionId);
    }
    if (session.window && session.window.sessionId) {
      return browser.sessions.restore(session.window.sessionId);
    }
  }

  reload(tabId: number, cache: boolean): Promise<void> {
    return browser.tabs.reload(tabId, { bypassCache: cache });
  }

  async setPinned(tabId: number, pinned: boolean): Promise<void> {
    await browser.tabs.update(tabId, { pinned });
  }

  async duplicate(id: number): Promise<Tab> {
    let tab = await browser.tabs.duplicate(id);
    return { ...tab, id: tab.id!! };
  }

  getZoom(tabId: number): Promise<number> {
    return browser.tabs.getZoom(tabId);
  }

  setZoom(tabId: number, factor: number): Promise<void> {
    return browser.tabs.setZoom(tabId, factor);
  }

  onSelected(
    listener: (arg: { tabId: number, windowId: number}) => void,
  ): void {
    browser.tabs.onActivated.addListener(listener);
  }
}

let tabPresenter = new TabPresenter();
tabPresenter.onSelected((tab: any) => {
  let cache = new MemoryStorage();

  let lastId = cache.get(CURRENT_SELECTED_KEY);
  if (lastId) {
    cache.set(LAST_SELECTED_KEY, lastId);
  }
  cache.set(CURRENT_SELECTED_KEY, tab.tabId);
});
