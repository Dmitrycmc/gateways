import { IsNotEmpty, Validate } from 'class-validator';
import { IPv4ValidRule } from '../validators/IPv4.validator';

export class CreateGatewayDto {
  @IsNotEmpty()
  readonly serialNumber: string;

  @IsNotEmpty()
  readonly name: string;

  @Validate(IPv4ValidRule)
  readonly IPv4: string;
}
