import { CreateDeviceDto } from '../dto/create-device.dto';
import { Id } from '../types/common';
const uniqid = require('uniqid');

type DeviceDto = CreateDeviceDto & {
  _id: string;
};

export class MockDevicesRepository {
  private static data: DeviceDto[] = [];

  constructor(private entity: DeviceDto) {}

  static find(filter: Partial<DeviceDto>) {
    if (!filter) {
      return this.data;
    }
    return this.data.filter((e) =>
      Object.entries(filter).every(([key, value]) => value === e[key]),
    );
  }

  static deleteMany(filter: Partial<DeviceDto>) {
    if (!filter) {
      this.data = [];
      return;
    }
    this.data = this.data.filter(
      (e) => !Object.entries(filter).every(([key, value]) => value === e[key]),
    );
  }

  static findByIdAndDelete(id: Id) {
    const result = this.data.find((e) => e._id === id);
    this.data = this.data.filter((e) => e._id !== id);
    return result;
  }

  static findByIdAndUpdate(id: Id, data: Partial<DeviceDto>) {
    const entity = this.data.find((e) => e._id === id);
    const updatedEntity = entity && { ...entity, ...data };
    this.data = this.data.map((e) => (e._id === id ? updatedEntity : e));
    return updatedEntity;
  }

  static updateMany(filter: Partial<DeviceDto>, data: Partial<DeviceDto>) {
    this.data = this.data.map((e) =>
      !filter ||
      Object.entries(filter).every(([key, value]) => value === e[key])
        ? { ...e, ...data }
        : e,
    );
  }

  static findById(id: Id) {
    return this.data.find((e) => e._id === id);
  }

  save() {
    const entity = { ...this.entity, _id: uniqid() };
    MockDevicesRepository.data.push(entity);
    return entity;
  }
}
