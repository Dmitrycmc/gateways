import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { GatewaysService } from './gateways.service';
import { Gateway, GatewayWithId } from '../types/gateways';
import { Id } from '../types/common';
import { DevicesService } from '../devices/devices.service';

@Controller('api/gateways')
export class GatewaysController {
  constructor(
    private readonly gatewaysService: GatewaysService,
    private readonly devicesService: DevicesService,
  ) {}

  @Post()
  create(@Body() data: Gateway): GatewayWithId {
    return this.gatewaysService.create(data);
  }

  @Get()
  readAll(): GatewayWithId[] {
    return this.gatewaysService.readAll();
  }

  @Get('/:id')
  read(@Param('id') id: Id): GatewayWithId {
    return this.gatewaysService.read(id);
  }

  @Put('/:id')
  update(@Param('id') id: Id, @Body() data: Gateway): GatewayWithId {
    return this.gatewaysService.update(id, data);
  }

  @Delete('/:id')
  delete(@Param('id') id: Id): GatewayWithId {
    const entity = this.gatewaysService.delete(id);
    this.devicesService.unbindGateway(id);
    return entity;
  }
}
