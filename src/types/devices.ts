export type Device = {
  name: string;
  gatewayId?: Id;
};

export type DeviceWithId = Device & {
  id: Id;
};
