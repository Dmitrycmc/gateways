import { Id } from '../types/common';
import { CreateGatewayDto } from '../dto/create-gateway.dto';
const uniqid = require('uniqid');

type GatewayDto = CreateGatewayDto & {
  _id: string;
};

export class MockGatewaysRepository {
  private static data: GatewayDto[] = [];

  constructor(private entity: GatewayDto) {}

  static find(filter: Partial<GatewayDto>) {
    if (!filter) {
      return this.data;
    }
    return this.data.filter((e) =>
      Object.entries(filter).every(([key, value]) => value === e[key]),
    );
  }

  static deleteMany(filter: Partial<GatewayDto>) {
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

  static findByIdAndUpdate(id: Id, data: Partial<GatewayDto>) {
    const entity = this.data.find((e) => e._id === id);
    const updatedEntity = entity && { ...entity, ...data };
    this.data = this.data.map((e) => (e._id === id ? updatedEntity : e));
    return updatedEntity;
  }

  static findById(id: Id) {
    return this.data.find((e) => e._id === id);
  }

  save() {
    const entity = { ...this.entity, _id: uniqid() };
    MockGatewaysRepository.data.push(entity);
    return entity;
  }
}
