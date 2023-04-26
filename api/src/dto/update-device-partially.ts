import { PartialType } from '@nestjs/mapped-types';
import { UpdateDeviceDto } from './update-device.dto';

export class UpdateDevicePartiallyDto extends PartialType(UpdateDeviceDto) {}
