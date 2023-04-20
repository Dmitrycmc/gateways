import { Id } from './common';

export type Gateway = {
  name: string;
};

export type GatewayWithId = Gateway & {
  id: Id;
};
