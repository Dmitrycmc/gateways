import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';

@ValidatorConstraint({ name: 'IPv4Valid' })
@Injectable()
export class IPv4ValidRule implements ValidatorConstraintInterface {
  validate(value: string) {
    const parts = value?.split('.');

    return (
      parts &&
      parts.length === 4 &&
      parts.every((part) => {
        return (
          String(parseInt(part, 10)) === part &&
          0 <= Number(part) &&
          Number(part) <= 255
        );
      })
    );
  }

  defaultMessage() {
    return `IPv4 is not valid`;
  }
}
