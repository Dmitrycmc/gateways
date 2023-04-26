import { Document } from 'mongoose';

export interface IGateway extends Document {
  readonly serialNumber: string;
  readonly name: string;
  readonly IPv4: string;
}
