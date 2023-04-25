import { Id } from './common';
import { WithId } from 'mongodb';

export type Device = {
  name: string;
  gatewayId?: Id;
};

export type DeviceWithId = WithId<Device>;
