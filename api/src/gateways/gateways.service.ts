import { Injectable } from '@nestjs/common';
import { NotFoundError } from '../errors/NotFoundError';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IGateway } from '../interfaces/gateway.interface';
import { CreateGatewayDto } from '../dto/create-gateway.dto';
import { UpdateGatewayDto } from '../dto/update-gateway.dto';
import { Id } from '../types/common';

@Injectable()
export class GatewaysService {
  constructor(@InjectModel('Gateway') private model: Model<IGateway>) {}

  async create(data: CreateGatewayDto): Promise<IGateway> {
    const newEntity = await new this.model(data);
    return newEntity.save();
  }

  readAll(): Promise<IGateway[]> {
    return this.model.find();
  }

  async read(id: Id): Promise<IGateway> {
    const entity = await this.model.findById(id).exec();
    if (!entity) {
      throw new NotFoundError();
    }
    return entity;
  }

  async update(id: Id, data: UpdateGatewayDto): Promise<IGateway> {
    const existingStudent = await this.model.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!existingStudent) {
      throw new NotFoundError();
    }
    return existingStudent;
  }

  async delete(id: Id): Promise<IGateway> {
    const deletedStudent = await this.model.findByIdAndDelete(id);
    if (!deletedStudent) {
      throw new NotFoundError();
    }
    return deletedStudent;
  }
}
