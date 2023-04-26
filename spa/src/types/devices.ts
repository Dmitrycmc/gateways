import { Id } from './common';

export type Device = {
  uid: number;
  vendor: string;
  createdAt: string;
  status: boolean;
  gatewayId?: Id;
};

export type DeviceWithId = Device & {
  _id: Id;
};
