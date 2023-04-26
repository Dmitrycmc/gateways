import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateGatewayDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly name: string;
}
