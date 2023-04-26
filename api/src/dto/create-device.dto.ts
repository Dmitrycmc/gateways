import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateDeviceDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly gatewayId: string;
}
