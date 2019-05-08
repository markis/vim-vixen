import Bookmark from '../domains/Bookmark';

export default interface BookmarkRepository {
  create(title: string, url: string): Promise<Bookmark>;

  // eslint-disable-next-line semi
}

export class BookmarkRepositoryImpl implements BookmarkRepository {
  async create(title: string, url: string): Promise<Bookmark> {
    let item = await browser.bookmarks.create({
      type: 'bookmark',
      title,
      url,
    });
    if (!item) {
      throw new Error('Could not create a bookmark');
    }
    return { id: item.id, title: item.title, url: item.url! };
  }
}
