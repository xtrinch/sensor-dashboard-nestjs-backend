import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { ForwarderCreateDto } from '~modules/forwarder/dto/forwarder.create.dto';
import { ForwarderUpdateDto } from '~modules/forwarder/dto/forwarder.update.dto';
import { Forwarder } from '~modules/forwarder/forwarder.entity';
import {
  ForwarderFixture,
  ForwarderFixtureInterface
} from '~modules/forwarder/forwarder.fixture';
import { ForwarderModule } from '~modules/forwarder/forwarder.module';
import { ForwarderService } from '~modules/forwarder/forwarder.service';
import { SensorModule } from '~modules/sensor/sensor.module';
import { UserModule } from '~modules/user/user.module';
import { BoardTypeEnum } from '~utils/board-types.enum';

describe('ForwarderService', () => {
  let forwarderService: ForwarderService;
  let module: TestingModule = null;
  let fixture: ForwarderFixtureInterface;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [ForwarderService],
      imports: [
        ForwarderModule,
        UserModule,
        SensorModule,
        TypeOrmModule.forRoot(),
        TypeOrmModule.forFeature([Forwarder]),
      ],
    }).compile();

    forwarderService = module.get<ForwarderService>(ForwarderService);
    fixture = await ForwarderFixture(module);
  }, 20000);

  it('should create a forwarder', async () => {
    const data = plainToClass(ForwarderCreateDto, {
      name: 'A forwarder name',
      location: 'A location',
      boardType: BoardTypeEnum.DOIT_ESP32_DEVKIT_V1
    });

    await validateOrReject(data);
    const forwarder = await forwarderService.create(fixture.userRequest, data);
    expect(forwarder).toBeDefined();
    expect(forwarder.accessToken).toBeDefined();
  });

  it('should update a forwarder', async () => {
    const data = plainToClass(ForwarderUpdateDto, {
      location: 'A new location',
    });

    await validateOrReject(data);
    const forwarder = await forwarderService.update(
      fixture.userRequest,
      fixture.forwarderOne.id,
      data,
    );
    expect(forwarder).toBeDefined();
    expect(forwarder.location).toEqual('A new location');
  });

  it('should list forwarders', async () => {
    const forwarders = await forwarderService.findAll(
      {},
      {},
      {
        limit: 20,
        page: 1,
      },
    );

    expect(forwarders.items.length).not.toBe(0);
  });

  it('should delete a forwarder', async () => {
    const success = await forwarderService.delete(fixture.userRequest, {
      id: fixture.forwarderOne.id,
    });

    expect(success).toEqual(true);
  });

  it('should ping as a forwarder', async () => {
    const success = await forwarderService.registerPing(
      fixture.forwarderRequest,
    );

    expect(success).toEqual(true);
  });

  afterAll(async () => {
    await module.close();
  });
});
