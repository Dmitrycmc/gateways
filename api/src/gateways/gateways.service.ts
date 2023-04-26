import { Injectable } from '@nestjs/common';
import { NotFoundError } from '../errors/NotFoundError';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IGateway } from '../interfaces/gateway.interface';
import { CreateGatewayDto } from '../dto/create-gateway.dto';
import { UpdateGatewayDto } from '../dto/update-gateway.dto';
import { Id } from '../types/common';
import { DuplicateSerialNumberError } from '../errors/DuplicateSerialNumberError';

const MONGO_DUPLICATE_ERROR = 11000;

@Injectable()
export class GatewaysService {
  constructor(@InjectModel('Gateway') private model: Model<IGateway>) {}

  async create(data: CreateGatewayDto): Promise<IGateway> {
    const entity = await new this.model({
      ...data,
      createdAt: new Date().toISOString(),
    });

    try {
      return await entity.save();
    } catch (e) {
      if (e.code === MONGO_DUPLICATE_ERROR) {
        throw new DuplicateSerialNumberError();
      }
      throw e;
    }
  }

  readAll(): Promise<IGateway[]> {
    return this.model.find();
  }

  async read(id: Id): Promise<IGateway> {
    const entity = await this.model.findById(id);
    if (!entity) {
      throw new NotFoundError();
    }
    return entity;
  }

  async update(id: Id, data: UpdateGatewayDto): Promise<IGateway> {
    const entity = await this.model.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!entity) {
      throw new NotFoundError();
    }
    return entity;
  }

  async delete(id: Id): Promise<IGateway> {
    const entity = await this.model.findByIdAndDelete(id);
    if (!entity) {
      throw new NotFoundError();
    }
    return entity;
  }
}
