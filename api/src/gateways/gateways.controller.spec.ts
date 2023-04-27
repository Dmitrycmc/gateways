import { Test, TestingModule } from '@nestjs/testing';
import { GatewaysController } from './gateways.controller';
import { GatewaysService } from './gateways.service';
import { NotFoundError } from '../errors/NotFoundError';
import { CreateGatewayDto } from '../dto/create-gateway.dto';
import { getModelToken } from '@nestjs/mongoose';
import { MockGatewaysRepository } from '../mocks/MockGatewaysRepository';
import { DevicesService } from '../devices/devices.service';
import { MockDevicesRepository } from '../mocks/MockDevicesRepository';

const gateway1: CreateGatewayDto = {
  serialNumber: '123',
  name: 'Name 1',
  IPv4: '12.12.12.12',
};

const gateway2: CreateGatewayDto = {
  serialNumber: '456',
  name: 'Name 2',
  IPv4: '0.12.255.10',
};

const updatedName = 'New name';

describe('GatewaysController', () => {
  let controller: GatewaysController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GatewaysController],
      providers: [
        GatewaysService,
        DevicesService,
        { provide: getModelToken('Gateway'), useValue: MockGatewaysRepository },
        { provide: getModelToken('Device'), useValue: MockDevicesRepository },
      ],
    }).compile();

    controller = module.get<GatewaysController>(GatewaysController);
    await controller.deleteAll();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return empty list as default', async () => {
    expect(await controller.readAll()).toEqual([]);
  });

  it('should create new gateway and return it', async () => {
    const entity = await controller.create(gateway1);
    expect(entity).not.toBeNull();

    expect(await controller.readAll()).toEqual([entity]);
    expect(await controller.read(entity._id)).toEqual(entity);
  });

  it('should delete gateway and not return it', async () => {
    const entity1 = await controller.create(gateway1);
    const entity2 = await controller.create(gateway2);

    expect(await controller.delete(entity1._id)).toEqual(entity1);

    expect(await controller.readAll()).toEqual([entity2]);
    await expect(() => controller.read(entity1._id)).rejects.toThrowError(
      NotFoundError,
    );
  });

  it('should update gateway and return updated one', async () => {
    const entity1 = await controller.create(gateway1);
    const entity2 = await controller.create(gateway2);

    const updatedEntity2 = { ...entity2, name: updatedName };
    expect(
      await controller.update(entity2._id, {
        ...entity2,
        name: updatedName,
      }),
    ).toEqual(updatedEntity2);

    expect(await controller.readAll()).toEqual([entity1, updatedEntity2]);
    expect(await controller.read(entity2._id)).toEqual(updatedEntity2);
  });

  it('should return 404', async () => {
    await controller.create(gateway1);
    await controller.create(gateway2);

    const wrongId = 'wrongId';

    await expect(() => controller.read(wrongId)).rejects.toThrowError(
      NotFoundError,
    );
    await expect(() => controller.delete(wrongId)).rejects.toThrowError(
      NotFoundError,
    );
    await expect(() =>
      controller.update(wrongId, { ...gateway1, name: updatedName }),
    ).rejects.toThrowError(NotFoundError);
  });
});
