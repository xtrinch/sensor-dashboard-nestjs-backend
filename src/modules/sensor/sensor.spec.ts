import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { SensorService } from '~modules/sensor/sensor.service';
import { SensorCreateDto } from '~modules/sensor/dto/sensor.create.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { SensorBoardTypesEnum } from '~modules/sensor/enum/sensor-board-types.enum';
import { TypeOrmModule } from '@nestjs/typeorm';
import Sensor from '~modules/sensor/sensor.entity';
import { getConnection, createConnection } from 'typeorm';
import { MeasurementTypeEnum } from '~modules/measurement/enum/measurement-type.enum';
import {
  SensorFixtureInterface,
  SensorFixture,
} from '~modules/sensor/sensor.fixture';
import { v4 } from 'uuid';
import { SensorUpdateDto } from '~modules/sensor/dto/sensor.update.dto';

describe('SensorService', () => {
  let sensorService: SensorService;
  let module: TestingModule = null;
  let fixture: SensorFixtureInterface;

  beforeAll(async () => {
    //await createConnection();
    const seed = v4();

    module = await Test.createTestingModule({
      providers: [SensorService],
      imports: [TypeOrmModule.forFeature([Sensor]), TypeOrmModule.forRoot()],
    }).compile();

    sensorService = module.get<SensorService>(SensorService);
    fixture = await SensorFixture(module, { seed });
  }, 10000);

  it('should create a sensor', async () => {
    const data = plainToClass(SensorCreateDto, {
      name: 'A sensor name',
      boardType: SensorBoardTypesEnum.BME680,
      location: 'A location',
      measurementTypes: [MeasurementTypeEnum.GAS],
    });

    await validateOrReject(data);
    const sensor = await sensorService.create(data);
    expect(sensor).toBeDefined();
  });

  it('should update a sensor', async () => {
    const data = plainToClass(SensorUpdateDto, {
      measurementTypes: [MeasurementTypeEnum.HUMIDITY],
    });

    await validateOrReject(data);
    const sensor = await sensorService.update(fixture.sensorOne.id, data);
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
    //await getConnection().close();
    //await module.close();
  });
});
