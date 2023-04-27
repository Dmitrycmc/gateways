import { Test, TestingModule } from '@nestjs/testing';
import { DevicesController } from './devices.controller';
import { DevicesService } from './devices.service';
import { NotFoundError } from '../errors/NotFoundError';
import { CreateDeviceDto } from '../dto/create-device.dto';
import { getModelToken } from '@nestjs/mongoose';
import { MockDevicesRepository } from '../mocks/MockDevicesRepository';

const device1: CreateDeviceDto = {
  uid: 123,
  vendor: 'Vendor 1',
  status: true,
  gatewayId: null,
};

const device2: CreateDeviceDto = {
  uid: 234,
  vendor: 'Vendor 2',
  status: false,
  gatewayId: null,
};

const updatedVendor = 'New vendor';

describe('DevicesController', () => {
  let controller: DevicesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DevicesController],
      providers: [
        DevicesService,
        { provide: getModelToken('Device'), useValue: MockDevicesRepository },
      ],
    }).compile();

    controller = module.get<DevicesController>(DevicesController);
    await controller.deleteAll();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return empty list as default', async () => {
    expect(await controller.readAll()).toEqual([]);
  });

  it('should create new device and return it', async () => {
    const entity = await controller.create(device1);
    expect(entity).not.toBeNull();

    expect(await controller.readAll()).toEqual([entity]);
    expect(await controller.read(entity._id)).toEqual(entity);
  });

  it('should delete device and not return it', async () => {
    const entity1 = await controller.create(device1);
    const entity2 = await controller.create(device2);

    expect(await controller.delete(entity1._id)).toEqual(entity1);

    expect(await controller.readAll()).toEqual([entity2]);
    await expect(() => controller.read(entity1._id)).rejects.toThrowError(
      NotFoundError,
    );
  });

  it('should update device and return updated one', async () => {
    const entity1 = await controller.create(device1);
    const entity2 = await controller.create(device2);

    const updatedEntity2 = { ...entity2, vendor: updatedVendor };
    expect(
      await controller.update(entity2._id, {
        ...entity2,
        vendor: updatedVendor,
      }),
    ).toEqual(updatedEntity2);

    expect(await controller.readAll()).toEqual([entity1, updatedEntity2]);
    expect(await controller.read(entity2._id)).toEqual(updatedEntity2);
  });

  it('should return 404', async () => {
    await controller.create(device1);
    await controller.create(device2);

    const wrongId = 'wrongId';

    await expect(() => controller.read(wrongId)).rejects.toThrowError(
      NotFoundError,
    );
    await expect(() => controller.delete(wrongId)).rejects.toThrowError(
      NotFoundError,
    );
    await expect(() =>
      controller.update(wrongId, { ...device1, vendor: updatedVendor }),
    ).rejects.toThrowError(NotFoundError);
  });
});
