import { HttpException, HttpStatus } from '@nestjs/common';

export class DuplicateSerialNumberError extends HttpException {
  constructor() {
    super(`Duplicate serial number`, HttpStatus.BAD_REQUEST);
  }
}
