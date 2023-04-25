import { Module } from '@nestjs/common';
import { GatewaysService } from './gateways.service';
import { GatewaysController } from './gateways.controller';
import { DevicesService } from '../devices/devices.service';

@Module({
  providers: [GatewaysService, DevicesService],
  controllers: [GatewaysController],
})
export class GatewaysModule {}
