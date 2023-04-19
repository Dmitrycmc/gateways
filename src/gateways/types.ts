export type Gateway = {
  name: string;
};

type Id = string;

export type GatewayWithId = Gateway & {
  id: Id;
};
