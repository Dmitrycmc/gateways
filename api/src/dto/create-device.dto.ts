import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateDeviceDto {
  @IsNumber()
  readonly uid: number;

  @IsNotEmpty()
  readonly vendor: string;

  @IsBoolean()
  readonly status: boolean;

  @IsOptional()
  readonly gatewayId: string | null;
}
