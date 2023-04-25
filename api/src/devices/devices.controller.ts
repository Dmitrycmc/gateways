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
import { Id } from '../types/common';

@Controller('api/devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Post()
  async create(@Body() data: Device): Promise<string> {
    return JSON.stringify(await this.devicesService.create(data));
  }

  @Get()
  readAll(): Promise<DeviceWithId[]> {
    return this.devicesService.readAll();
  }

  @Get('/:id')
  read(@Param('id') id: Id): Promise<DeviceWithId> {
    return this.devicesService.read(id);
  }

  @Put('/:id')
  update(@Param('id') id: Id, @Body() data: Device): Promise<DeviceWithId> {
    return this.devicesService.update(id, data);
  }

  @Delete('/:id')
  delete(@Param('id') id: Id): Promise<void> {
    return this.devicesService.delete(id);
  }
}
