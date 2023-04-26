import { Id } from './common';

export type Gateway = {
  serialNumber: string;
  name: string;
  IPv4: string;
};

export type GatewayWithId = Gateway & {
  _id: Id;
};
