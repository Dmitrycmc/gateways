import { Injectable } from '@nestjs/common';
import { NotFoundError } from '../errors/NotFoundError';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IDevice } from '../interfaces/device.interface';
import { CreateDeviceDto } from '../dto/create-device.dto';
import { UpdateDeviceDto } from '../dto/update-device.dto';
import { Id } from '../types/common';

@Injectable()
export class DevicesService {
  constructor(@InjectModel('Device') private model: Model<IDevice>) {}

  async create(data: CreateDeviceDto): Promise<IDevice> {
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

  async update(id: Id, data: UpdateDeviceDto): Promise<IDevice> {
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

  /*async unbindGateway(id: Id): Promise<void> {
     await this.exec(c => c.updateMany({gatewayId: id}, {$set: {gatewayId: null}}))
  }*/
}
