import MarkUseCase from '../usecases/MarkUseCase';

export default class MarkController {
  private markUseCase: MarkUseCase;

  constructor() {
    this.markUseCase = new MarkUseCase();
  }

  setGlobal(key: string, x: number, y: number): Promise<void> {
    return this.markUseCase.setGlobal(key, x, y);
  }

  jumpGlobal(key: string): Promise<void> {
    return this.markUseCase.jumpGlobal(key);
  }
}
