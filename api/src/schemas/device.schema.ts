import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Device {
  @Prop({
    required: true,
    type: Number,
  })
  uid: number;

  @Prop({
    required: true,
    type: String,
  })
  vendor: string;

  @Prop({
    required: true,
    type: String,
  })
  createdAt: string;

  @Prop({
    required: true,
    type: Boolean,
  })
  status: boolean;

  @Prop({
    type: String,
  })
  gatewayId: string;
}

export const DeviceSchema = SchemaFactory.createForClass(Device);
