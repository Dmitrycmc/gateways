import { Injectable } from '@nestjs/common';
import { NotFoundError } from '../errors/NotFoundError';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IDevice } from '../interfaces/device.interface';
import { CreateDeviceDto } from '../dto/create-device.dto';
import { UpdateDeviceDto } from '../dto/update-device.dto';
import { Id } from '../types/common';
import { TooManyDevicesError } from '../errors/TooManyDevicesError';
import { MAX_BOUND_DEVICES } from '../constants';
import { UpdateDevicePartiallyDto } from '../dto/update-device-partially';

@Injectable()
export class DevicesService {
  constructor(@InjectModel('Device') private model: Model<IDevice>) {}

  async create(data: CreateDeviceDto): Promise<IDevice> {
    if (data.gatewayId) {
      const boundEntities = await this.model.find({
        gatewayId: data.gatewayId,
      });
      if (boundEntities.length >= MAX_BOUND_DEVICES) {
        throw new TooManyDevicesError(MAX_BOUND_DEVICES);
      }
    }

    const entity = await new this.model({
      ...data,
      createdAt: new Date().toISOString(),
    });
    return entity.save();
  }

  readAll(): Promise<IDevice[]> {
    return this.model.find();
  }

  async read(id: Id): Promise<IDevice> {
    const entity = await this.model.findById(id);
    if (!entity) {
      throw new NotFoundError();
    }
    return entity;
  }

  async update(
    id: Id,
    data: UpdateDeviceDto | UpdateDevicePartiallyDto,
  ): Promise<IDevice> {
    if (data.gatewayId) {
      const boundEntities = await this.model.find({
        gatewayId: data.gatewayId,
        _id: { $ne: id },
      });
      if (boundEntities.length >= MAX_BOUND_DEVICES) {
        throw new TooManyDevicesError(MAX_BOUND_DEVICES);
      }
    }

    const entity = await this.model.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!entity) {
      throw new NotFoundError();
    }
    return entity;
  }

  async delete(id: Id): Promise<IDevice> {
    const entity = await this.model.findByIdAndDelete(id);
    if (!entity) {
      throw new NotFoundError();
    }
    return entity;
  }

  async unbindGateway(gatewayId: Id): Promise<void> {
    await this.model.updateMany({ gatewayId }, { gatewayId: null });
  }
}
