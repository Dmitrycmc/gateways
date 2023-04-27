import { Module } from '@nestjs/common';
import { GatewaysModule } from './gateways/gateways.module';
import { DevicesModule } from './devices/devices.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { getDbUri } from './utils/db';

@Module({
  imports: [
    GatewaysModule,
    DevicesModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'spa', 'dist', 'gateways-spa'),
    }),
    MongooseModule.forRoot(getDbUri(), { dbName: 'gateways' }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
