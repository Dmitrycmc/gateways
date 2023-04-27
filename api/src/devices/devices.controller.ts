import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Put,
  Patch,
} from '@nestjs/common';
import { DevicesService } from './devices.service';
import { Id } from '../types/common';
import { IDevice } from '../interfaces/device.interface';
import { CreateDeviceDto } from '../dto/create-device.dto';
import { UpdateDeviceDto } from '../dto/update-device.dto';
import { UpdateDevicePartiallyDto } from '../dto/update-device-partially';

@Controller('api/devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Post()
  create(@Body() data: CreateDeviceDto): Promise<IDevice> {
    return this.devicesService.create(data);
  }

  @Get()
  readAll(): Promise<IDevice[]> {
    return this.devicesService.readAll();
  }

  @Get('/:id')
  read(@Param('id') id: Id): Promise<IDevice> {
    return this.devicesService.read(id);
  }

  @Put('/:id')
  update(@Param('id') id: Id, @Body() data: UpdateDeviceDto): Promise<IDevice> {
    return this.devicesService.update(id, data);
  }

  @Patch('/:id')
  updatePartially(
    @Param('id') id: Id,
    @Body() data: UpdateDevicePartiallyDto,
  ): Promise<IDevice> {
    return this.devicesService.update(id, data);
  }

  @Delete('')
  deleteAll(): Promise<void> {
    return this.devicesService.deleteAll();
  }

  @Delete('/:id')
  delete(@Param('id') id: Id): Promise<IDevice> {
    return this.devicesService.delete(id);
  }
}
