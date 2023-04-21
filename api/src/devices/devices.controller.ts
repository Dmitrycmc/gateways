import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { DevicesService } from './devices.service';
import { Device, DeviceWithId } from '../types/devices';

@Controller('api/devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Post()
  create(@Body() data: Device): DeviceWithId {
    return this.devicesService.create(data);
  }

  @Get()
  readAll(): DeviceWithId[] {
    return this.devicesService.readAll();
  }

  @Get('/:id')
  read(@Param('id') id: string): DeviceWithId {
    return this.devicesService.read(id);
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() data: Device): DeviceWithId {
    return this.devicesService.update(id, data);
  }

  @Delete('/:id')
  delete(@Param('id') id: string): DeviceWithId {
    return this.devicesService.delete(id);
  }
}
