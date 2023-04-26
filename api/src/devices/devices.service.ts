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
    const newEntity = await new this.model(data);
    return newEntity.save();
  }

  readAll(): Promise<IDevice[]> {
    return this.model.find();
  }

  async read(id: Id): Promise<IDevice> {
    const entity = await this.model.findById(id).exec();
    if (!entity) {
      throw new NotFoundError();
    }
    return entity;
  }

  async update(id: Id, data: UpdateDeviceDto): Promise<IDevice> {
    const existingStudent = await this.model.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!existingStudent) {
      throw new NotFoundError();
    }
    return existingStudent;
  }

  async delete(id: Id): Promise<IDevice> {
    const deletedStudent = await this.model.findByIdAndDelete(id);
    if (!deletedStudent) {
      throw new NotFoundError();
    }
    return deletedStudent;
  }

  /*async unbindGateway(id: Id): Promise<void> {
     await this.exec(c => c.updateMany({gatewayId: id}, {$set: {gatewayId: null}}))
  }*/
}
