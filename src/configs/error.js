export class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = 'CustomError';
  }

  toString() {
    return this.name + ': ' + this.message;
  }
}
