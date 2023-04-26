import { Id } from './common';

export type Device = {
  uid: number;
  vendor: string;
  createdAt: string;
  status: boolean;
  gatewayId: Id | null;
};

export type DeviceWithId = Device & {
  _id: Id;
};
