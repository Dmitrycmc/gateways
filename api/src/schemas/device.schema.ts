import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Device {
  @Prop()
  name: string;

  @Prop()
  gatewayId: string;
}

export const DeviceSchema = SchemaFactory.createForClass(Device);
