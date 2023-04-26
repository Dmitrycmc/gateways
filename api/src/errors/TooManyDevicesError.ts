import { HttpException, HttpStatus } from '@nestjs/common';

export class TooManyDevicesError extends HttpException {
  constructor(maxConnectedDevices: number) {
    super(
      `Unable to connect more than ${maxConnectedDevices} devices`,
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}
