import { Id } from './common';

export type Device = {
  name: string;
  gatewayId?: Id;
};

export type DeviceWithId = Device & {
  _id: Id;
};