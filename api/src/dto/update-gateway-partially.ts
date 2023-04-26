import { PartialType } from '@nestjs/mapped-types';
import { UpdateGatewayDto } from './update-gateway.dto';

export class UpdateGatewayPartiallyDto extends PartialType(UpdateGatewayDto) {}
