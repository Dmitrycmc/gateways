import { Document } from 'mongoose';

export interface IDevice extends Document {
  readonly name: string;
  readonly gatewayId: string;
}
