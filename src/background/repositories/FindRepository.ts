import MemoryStorage from '../infrastructures/MemoryStorage';

const FIND_KEYWORD_KEY = 'find-keyword';

export default interface FindRepository {
  getKeyword(): Promise<string>;

  setKeyword(keyword: string): Promise<void>;

  // eslint-disable-next-line semi
}

export class FindRepositoryImpl implements FindRepository {
  private cache: MemoryStorage;

  constructor() {
    this.cache = new MemoryStorage();
  }

  getKeyword(): Promise<string> {
    return Promise.resolve(this.cache.get(FIND_KEYWORD_KEY));
  }

  setKeyword(keyword: string): Promise<void> {
    this.cache.set(FIND_KEYWORD_KEY, keyword);
    return Promise.resolve();
  }
}

