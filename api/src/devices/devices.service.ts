import { Injectable } from '@nestjs/common';
import { nanoid } from 'nanoid';
import { NotFoundError } from '../errors/NotFoundError';
import { Device, DeviceWithId } from '../types/devices';

@Injectable()
export class DevicesService {
  private devices: DeviceWithId[] = [];

  create(device: Device): DeviceWithId {
    const entity = {
      id: nanoid(4),
      ...device,
    };
    this.devices.push(entity);
    return entity;
  }

  readAll(): DeviceWithId[] {
    return this.devices;
  }

  read(id: string): DeviceWithId {
    const entity = this.devices.find((g) => g.id === id);
    if (!entity) {
      throw new NotFoundError();
    }
    return entity;
  }

  update(id: string, data: Device): DeviceWithId | null {
    const entity = this.devices.find((g) => g.id === id);
    if (!entity) {
      throw new NotFoundError();
    }
    Object.assign(entity, data);
    return entity;
  }

  delete(id: string): DeviceWithId | null {
    const entity = this.devices.find((g) => g.id === id);
    if (!entity) {
      throw new NotFoundError();
    }
    this.devices = this.devices.filter((e) => e !== entity);
    return entity;
  }
}
