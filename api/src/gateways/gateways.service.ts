import { Injectable } from '@nestjs/common';
import { NotFoundError } from '../errors/NotFoundError';
import { Gateway, GatewayWithId } from '../types/gateways';
import { Collection, MongoClient, ObjectId, ServerApiVersion } from 'mongodb';
import { config } from 'dotenv';
import {DevicesService} from "../devices/devices.service";

config();
const { USERNAME, PASSWORD } = process.env;

const uri = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.hb0m5.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

@Injectable()
export class GatewaysService {
  constructor(private devicesService: DevicesService) {}

  private async exec<R>(
    callback: (collection: Collection<Gateway>) => R,
  ): Promise<R> {
    try {
      await client.connect();
      const collection = client.db('gateways').collection<Gateway>('gateways');
      return await callback(collection);
    } finally {
      await client.close();
    }
  }

  async create(data: Gateway): Promise<string> {
    const result = await this.exec((c) => c.insertOne(data));
    return result.insertedId.toString();
  }

  async readAll(): Promise<GatewayWithId[]> {
    return this.exec((c) => c.find().toArray());
  }

  async read(id: string): Promise<GatewayWithId> {
    const result = await this.exec((c) => c.findOne({ _id: new ObjectId(id) }));
    if (!result) {
      throw new NotFoundError();
    }
    return result;
  }

  async update(id: string, data: Gateway): Promise<GatewayWithId> {
    const result = await this.exec((c) =>
      c.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: data }),
    );
    if (!result.value) {
      throw new NotFoundError();
    }
    return result.value;
  }

  async delete(id: string): Promise<void> {
    const result = await this.exec((c) =>
      c.deleteOne({ _id: new ObjectId(id) }),
    );
    if (!result.deletedCount) {
      throw new NotFoundError();
    }
    await this.devicesService.unbindGateway(id)
  }
}
