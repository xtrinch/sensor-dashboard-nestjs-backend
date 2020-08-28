import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { v4 } from 'uuid';
import { MeasurementTypeEnum } from '~modules/measurement/enum/measurement-type.enum';
import { SensorCreateDto } from '~modules/sensor/dto/sensor.create.dto';
import { SensorUpdateDto } from '~modules/sensor/dto/sensor.update.dto';
import { SensorBoardTypesEnum } from '~modules/sensor/enum/sensor-board-types.enum';
import { Sensor } from '~modules/sensor/sensor.entity';
import {
  SensorFixture,
  SensorFixtureInterface,
} from '~modules/sensor/sensor.fixture';
import { SensorService } from '~modules/sensor/sensor.service';
import { UserModule } from '~modules/user/user.module';

describe('SensorService', () => {
  let sensorService: SensorService;
  let module: TestingModule = null;
  let fixture: SensorFixtureInterface;

  beforeAll(async () => {
    const seed = v4();

    module = await Test.createTestingModule({
      providers: [SensorService],
      imports: [
        UserModule,
        TypeOrmModule.forRoot(),
        TypeOrmModule.forFeature([Sensor]),
      ],
    }).compile();

    sensorService = module.get<SensorService>(SensorService);
    fixture = await SensorFixture(module, { seed });
  }, 20000);

  it('should create a sensor', async () => {
    const data = plainToClass(SensorCreateDto, {
      name: 'A sensor name',
      boardType: SensorBoardTypesEnum.BME680,
      location: 'A location',
      measurementTypes: [MeasurementTypeEnum.GAS],
      timezone: 'Europe/Vienna',
    });

    await validateOrReject(data);
    const sensor = await sensorService.create(fixture.userRequest, data);
    expect(sensor).toBeDefined();
    //expect(sensor.measurementTypes).toEqual([MeasurementTypeEnum.GAS]);
    expect(sensor.timezone).toEqual('Europe/Vienna');
    expect(sensor.sensorAccessToken).toBeDefined();
  });

  it('should update a sensor', async () => {
    const data = plainToClass(SensorUpdateDto, {
      measurementTypes: [MeasurementTypeEnum.HUMIDITY],
    });

    await validateOrReject(data);
    const sensor = await sensorService.update(
      fixture.userRequest,
      fixture.sensorOne.id,
      data,
    );
    expect(sensor).toBeDefined();
    expect(sensor.measurementTypes).toEqual([MeasurementTypeEnum.HUMIDITY]);
  });

  it('should list sensors', async () => {
    const sensors = await sensorService.findAll(
      {},
      {
        limit: 20,
        page: 1,
      },
    );

    expect(sensors.items.length).not.toBe(0);
  });

  afterAll(async () => {
    await module.close();
  });
});
