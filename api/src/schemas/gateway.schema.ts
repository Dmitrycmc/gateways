import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Gateway {
  @Prop({
    required: true,
    unique: true,
    type: String,
  })
  serialNumber: string;

  @Prop({
    required: true,
    type: String,
  })
  name: string;

  @Prop({
    required: true,
    type: String,
  })
  IPv4: string;
}

export const GatewaySchema = SchemaFactory.createForClass(Gateway);
