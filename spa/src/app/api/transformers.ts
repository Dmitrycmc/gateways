import {DeviceWithId} from "../../types/devices";

export const prepareDevice = (device: DeviceWithId): DeviceWithId => ({
  ...device,
  createdAt: (new Date(device.createdAt)).toLocaleDateString()
})
