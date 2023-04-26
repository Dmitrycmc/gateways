import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Gateway {
  @Prop()
  name: string;
}

export const GatewaySchema = SchemaFactory.createForClass(Gateway);
