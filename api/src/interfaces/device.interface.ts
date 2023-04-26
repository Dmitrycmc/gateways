import { Document } from 'mongoose';

export interface IDevice extends Document {
  readonly uid: number;
  readonly vendor: string;
  readonly createdAt: string;
  readonly status: boolean;
  readonly gatewayId: string;
}
