import { Module } from '@nestjs/common';
import { GatewaysService } from './gateways.service';
import { GatewaysController } from './gateways.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { GatewaySchema } from '../schemas/gateway.schema';
import { DevicesService } from '../devices/devices.service';
import { DeviceSchema } from '../schemas/device.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Gateway', schema: GatewaySchema }]),
    MongooseModule.forFeature([{ name: 'Device', schema: DeviceSchema }]),
  ],
  providers: [GatewaysService, DevicesService],
  controllers: [GatewaysController],
})
export class GatewaysModule {}
