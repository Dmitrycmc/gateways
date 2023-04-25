import { Injectable } from '@nestjs/common';
import { Device, DeviceWithId } from '../types/devices';
import { config } from 'dotenv';
import { Collection, MongoClient, ObjectId, ServerApiVersion } from 'mongodb';
import { NotFoundError } from '../errors/NotFoundError';

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
export class DevicesService {
  private async exec<R>(
    callback: (collection: Collection<Device>) => R,
  ): Promise<R> {
    try {
      await client.connect();
      const collection = client.db('gateways').collection<Device>('devices');
      return await callback(collection);
    } finally {
      await client.close();
    }
  }

  async create(data: Device): Promise<string> {
    const result = await this.exec((c) => c.insertOne(data));
    return result.insertedId.toString();
  }

  async readAll(): Promise<DeviceWithId[]> {
    return this.exec((c) => c.find().toArray());
  }

  async read(id: string): Promise<DeviceWithId> {
    const result = await this.exec((c) => c.findOne({ _id: new ObjectId(id) }));
    if (!result) {
      throw new NotFoundError();
    }
    return result;
  }

  async update(id: string, data: Device): Promise<DeviceWithId> {
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
  }

  async unbindGateway(id: string): Promise<void> {
     await this.exec(c => c.updateMany({gatewayId: id}, {$set: {gatewayId: null}}))
  }
}
