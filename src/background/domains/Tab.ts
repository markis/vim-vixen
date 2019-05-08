// Tab presents tab information.  It MUST contains id and a provider should
// omit tabs without id.
export default interface Tab {
  id: number;
  active: boolean;
  audible?: boolean;
  autoDiscardable?: boolean;
  cookieStoreId?: string;
  discarded?: boolean;
  favIconUrl?: string;
  height?: number;
  hidden: boolean;
  highlighted: boolean;
  incognito: boolean;
  index: number;
  isArticle: boolean;
  isInReaderMode: boolean;
  lastAccessed: number;
  mutedInfo?: browser.tabs.MutedInfo;
  openerTabId?: number;
  pinned: boolean;
  selected: boolean;
  sessionId?: string;
  status?: string;
  title?: string;
  url?: string;
  width?: number;
  windowId: number;
  // eslint-disable-next-line semi
}
