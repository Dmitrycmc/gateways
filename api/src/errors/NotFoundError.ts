import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundError extends HttpException {
  constructor() {
    super('Not found', HttpStatus.NOT_FOUND);
  }
}
