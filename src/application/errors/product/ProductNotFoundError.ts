export class ProductNotFoundError extends Error {
  constructor() {
    super('The Product was not found');
    this.name = 'ProductNotFoundError';
  }
}
