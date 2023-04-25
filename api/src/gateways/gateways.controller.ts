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
import { Gateway, GatewayWithId } from '../types/gateways';
import { Id } from '../types/common';

@Controller('api/gateways')
export class GatewaysController {
  constructor(private readonly gatewaysService: GatewaysService) {}

  @Post()
  async create(@Body() data: Gateway): Promise<string> {
    return JSON.stringify(await this.gatewaysService.create(data));
  }

  @Get()
  readAll(): Promise<GatewayWithId[]> {
    return this.gatewaysService.readAll();
  }

  @Get('/:id')
  read(@Param('id') id: Id): Promise<GatewayWithId> {
    return this.gatewaysService.read(id);
  }

  @Put('/:id')
  update(@Param('id') id: Id, @Body() data: Gateway): Promise<GatewayWithId> {
    return this.gatewaysService.update(id, data);
  }

  @Delete('/:id')
  delete(@Param('id') id: Id): Promise<void> {
    return this.gatewaysService.delete(id);
  }
}
