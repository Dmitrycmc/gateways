import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Gateway {
  @Prop()
  serialNumber: string;

  @Prop()
  name: string;

  @Prop()
  IPv4: string;
}

export const GatewaySchema = SchemaFactory.createForClass(Gateway);
