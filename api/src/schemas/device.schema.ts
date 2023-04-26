import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Device {
  @Prop()
  uid: number;

  @Prop()
  vendor: string;

  @Prop()
  createdAt: string;

  @Prop()
  status: boolean;

  @Prop()
  gatewayId: string;
}

export const DeviceSchema = SchemaFactory.createForClass(Device);
