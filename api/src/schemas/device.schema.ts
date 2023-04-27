import { Prop, Schema as NestSchema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

@NestSchema()
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
    type: MongooseSchema.Types.ObjectId,
    ref: 'Gateway',
  })
  gatewayId?: string;
}

export const DeviceSchema = SchemaFactory.createForClass(Device);
