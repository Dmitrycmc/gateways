import { WithId } from 'mongodb';

export type Gateway = {
  name: string;
};

export type GatewayWithId = WithId<Gateway>;
