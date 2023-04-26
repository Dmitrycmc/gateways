import { Document } from 'mongoose';

export interface IGateway extends Document {
  readonly name: string;
}
