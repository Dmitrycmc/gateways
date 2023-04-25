import { Injectable } from '@nestjs/common';
import { nanoid } from 'nanoid';
import { NotFoundError } from '../errors/NotFoundError';
import { Gateway, GatewayWithId } from '../types/gateways';
import { Id } from '../types/common';

@Injectable()
export class GatewaysService {
  private gateways: GatewayWithId[] = [];

  create(gateway: Gateway): GatewayWithId {
    const entity = {
      id: nanoid(4),
      ...gateway,
    };
    this.gateways.push(entity);
    return entity;
  }

  readAll(): GatewayWithId[] {
    return this.gateways;
  }

  read(id: Id): GatewayWithId {
    const entity = this.gateways.find((g) => g.id === id);
    if (!entity) {
      throw new NotFoundError();
    }
    return entity;
  }

  update(id: Id, data: Gateway): GatewayWithId | null {
    const entity = this.gateways.find((g) => g.id === id);
    if (!entity) {
      throw new NotFoundError();
    }
    Object.assign(entity, data);
    return entity;
  }

  delete(id: Id): GatewayWithId | null {
    const entity = this.gateways.find((g) => g.id === id);
    if (!entity) {
      throw new NotFoundError();
    }
    this.gateways = this.gateways.filter((e) => e !== entity);
    return entity;
  }
}
