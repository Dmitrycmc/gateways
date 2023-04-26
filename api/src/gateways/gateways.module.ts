import { Module } from '@nestjs/common';
import { GatewaysService } from './gateways.service';
import { GatewaysController } from './gateways.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { GatewaySchema } from '../schemas/gateway.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Gateway', schema: GatewaySchema }]),
  ],
  providers: [GatewaysService],
  controllers: [GatewaysController],
})
export class GatewaysModule {}
