import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { GatewaysService } from './gateways.service';
import { Id } from '../types/common';
import { IGateway } from '../interfaces/gateway.interface';
import { CreateGatewayDto } from '../dto/create-gateway.dto';
import { UpdateGatewayDto } from '../dto/update-gateway.dto';
import { UpdateGatewayPartiallyDto } from '../dto/update-gateway-partially';

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
    @Body() data: UpdateGatewayDto,
  ): Promise<IGateway> {
    return this.gatewaysService.update(id, data);
  }

  @Patch('/:id')
  updatePartially(
    @Param('id') id: Id,
    @Body() data: UpdateGatewayPartiallyDto,
  ): Promise<IGateway> {
    return this.gatewaysService.update(id, data);
  }

  @Delete('/:id')
  delete(@Param('id') id: Id): Promise<IGateway> {
    return this.gatewaysService.delete(id);
  }
}
