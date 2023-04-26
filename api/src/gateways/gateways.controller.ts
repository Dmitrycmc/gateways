import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { GatewaysService } from './gateways.service';
import { Id } from '../types/common';
import { IGateway } from '../interfaces/gateway.interface';
import { CreateGatewayDto } from '../dto/create-gateway.dto';
import { UpdateDeviceDto } from '../dto/update-device.dto';

@Controller('api/gateways')
export class GatewaysController {
  constructor(private readonly gatewaysService: GatewaysService) {}

  @Post()
  async create(@Body() data: CreateGatewayDto): Promise<string> {
    return JSON.stringify(await this.gatewaysService.create(data));
  }

  @Get()
  readAll(): Promise<IGateway[]> {
    return this.gatewaysService.readAll();
  }

  @Get('/:id')
  read(@Param('id') id: Id): Promise<IGateway> {
    return this.gatewaysService.read(id);
  }

  @Put('/:id')
  update(
    @Param('id') id: Id,
    @Body() data: UpdateDeviceDto,
  ): Promise<IGateway> {
    return this.gatewaysService.update(id, data);
  }

  @Delete('/:id')
  delete(@Param('id') id: Id): Promise<IGateway> {
    return this.gatewaysService.delete(id);
  }
}
