import { Id } from './common';

export type Gateway = {
  name: string;
};

export type GatewayWithId = Gateway & {
  _id: Id;
};
