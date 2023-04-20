export type Device = {
  name: string;
};

type Id = string;

export type DeviceWithId = Device & {
  id: Id;
};
