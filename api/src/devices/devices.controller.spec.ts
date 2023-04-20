import { Test, TestingModule } from '@nestjs/testing';
import { DevicesController } from './devices.controller';
import { DevicesService } from './devices.service';
import { NotFoundError } from '../errors/NotFoundError';

const device1 = { name: 'Device 1' };
const device2 = { name: 'Device 2' };
const updatedName = 'New device name';

describe('DevicesController', () => {
  let controller: DevicesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DevicesController],
      providers: [DevicesService],
    }).compile();

    controller = module.get<DevicesController>(DevicesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return empty list as default', () => {
    expect(controller.readAll()).toEqual([]);
  });

  it('should create new device and return it', () => {
    const entity = controller.create(device1);
    expect(entity).not.toBeNull();

    expect(controller.readAll()).toEqual([entity]);
    expect(controller.read(entity.id)).toEqual(entity);
  });

  it('should delete device and not return it', () => {
    const entity1 = controller.create(device1);
    const entity2 = controller.create(device2);

    expect(controller.delete(entity1.id)).toEqual(entity1);

    expect(controller.readAll()).toEqual([entity2]);
    expect(() => controller.read(entity1.id)).toThrowError(NotFoundError);
  });

  it('should update device and return updated one', () => {
    const entity1 = controller.create(device1);
    const entity2 = controller.create(device2);

    const updatedEntity2 = { ...entity2, name: updatedName };
    expect(controller.update(entity2.id, { name: updatedName })).toEqual(
      updatedEntity2,
    );

    expect(controller.readAll()).toEqual([entity1, updatedEntity2]);
    expect(controller.read(entity2.id)).toEqual(updatedEntity2);
  });

  it('should return 404', () => {
    controller.create(device1);
    controller.create(device2);

    const wrongId = 'wrongId';

    expect(() => controller.read(wrongId)).toThrowError(NotFoundError);
    expect(() => controller.delete(wrongId)).toThrowError(NotFoundError);
    expect(() =>
      controller.update(wrongId, { name: updatedName }),
    ).toThrowError(NotFoundError);
  });
});
