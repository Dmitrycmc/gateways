import { Module } from '@nestjs/common';
import { GatewaysModule } from './gateways/gateways.module';
import { DevicesModule } from './devices/devices.module';
import {ServeStaticModule} from "@nestjs/serve-static";
import {join} from 'path';

@Module({
  imports: [
    GatewaysModule,
    DevicesModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'spa', 'dist', 'gateways-spa'),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
