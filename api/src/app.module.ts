import { Module } from '@nestjs/common';
import { GatewaysModule } from './gateways/gateways.module';
import { DevicesModule } from './devices/devices.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';

config();
const { USERNAME, PASSWORD } = process.env;

const uri = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.hb0m5.mongodb.net/?retryWrites=true&w=majority`;

@Module({
  imports: [
    GatewaysModule,
    DevicesModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'spa', 'dist', 'gateways-spa'),
    }),
    MongooseModule.forRoot(uri, { dbName: 'gateways' }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
