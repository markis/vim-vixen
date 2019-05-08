// Bookmark represents a bookmark item.  It MUST include both title
// and url.  The producer of it should omit items without a title.
export default interface Bookmark {
  id: string;
  title: string;
  url: string;

  // eslint-disable-next-line semi
}
