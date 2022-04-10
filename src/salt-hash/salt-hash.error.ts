export class InvalidSaltHashError extends Error {
  constructor() {
    super();
    this.name = 'InvalidSaltHashError';
    this.message = 'Invalid salt hash format!'
  }
}
