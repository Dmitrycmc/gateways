import { Test, TestingModule } from '@nestjs/testing';
import { GatewaysController } from './gateways.controller';
import { GatewaysService } from './gateways.service';
import { NotFoundError } from '../errors/NotFoundError';

const gateway1 = { name: 'Gateway 1' };
const gateway2 = { name: 'Gateway 2' };
const updatedName = 'New gateway name';

describe('GatewaysController', () => {
  let controller: GatewaysController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GatewaysController],
      providers: [GatewaysService],
    }).compile();

    controller = module.get<GatewaysController>(GatewaysController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return empty list as default', () => {
    expect(controller.readAll()).toEqual([]);
  });

  it('should create new gateway and return it', () => {
    const entity = controller.create(gateway1);
    expect(entity).not.toBeNull();

    expect(controller.readAll()).toEqual([entity]);
    expect(controller.read(entity.id)).toEqual(entity);
  });

  it('should delete gateway and not return it', () => {
    const entity1 = controller.create(gateway1);
    const entity2 = controller.create(gateway2);

    expect(controller.delete(entity1.id)).toEqual(entity1);

    expect(controller.readAll()).toEqual([entity2]);
    expect(() => controller.read(entity1.id)).toThrowError(NotFoundError);
  });

  it('should update gateway and return updated one', () => {
    const entity1 = controller.create(gateway1);
    const entity2 = controller.create(gateway2);

    const updatedEntity2 = { ...entity2, name: updatedName };
    expect(controller.update(entity2.id, { name: updatedName })).toEqual(
      updatedEntity2,
    );

    expect(controller.readAll()).toEqual([entity1, updatedEntity2]);
    expect(controller.read(entity2.id)).toEqual(updatedEntity2);
  });

  it('should return 404', () => {
    controller.create(gateway1);
    controller.create(gateway2);

    const wrongId = 'wrongId';

    expect(() => controller.read(wrongId)).toThrowError(NotFoundError);
    expect(() => controller.delete(wrongId)).toThrowError(NotFoundError);
    expect(() =>
      controller.update(wrongId, { name: updatedName }),
    ).toThrowError(NotFoundError);
  });
});
