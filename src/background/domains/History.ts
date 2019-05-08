// History represents a history which user visited.  It MUST includes
// url.  The provider of it should omit items without URL.
export default interface History {
  id: string;
  url: string;
  title?: string;
  lastVisitTime?: number;
  visitCount?: number;
  typedCount?: number;

  // eslint-disable-next-line semi
}
