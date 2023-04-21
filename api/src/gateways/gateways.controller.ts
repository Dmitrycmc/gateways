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

@Controller('api/gateways')
export class GatewaysController {
  constructor(private readonly gatewaysService: GatewaysService) {}

  @Post()
  create(@Body() data: Gateway): GatewayWithId {
    return this.gatewaysService.create(data);
  }

  @Get()
  readAll(): GatewayWithId[] {
    return this.gatewaysService.readAll();
  }

  @Get('/:id')
  read(@Param('id') id: string): GatewayWithId {
    return this.gatewaysService.read(id);
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() data: Gateway): GatewayWithId {
    return this.gatewaysService.update(id, data);
  }

  @Delete('/:id')
  delete(@Param('id') id: string): GatewayWithId {
    return this.gatewaysService.delete(id);
  }
}
