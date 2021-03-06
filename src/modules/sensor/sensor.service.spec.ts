import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { MeasurementTypeEnum } from '~modules/measurement/enum/measurement-type.enum';
import { SensorCreateDto } from '~modules/sensor/dto/sensor.create.dto';
import { SensorUpdateDto } from '~modules/sensor/dto/sensor.update.dto';
import { SensorTypeEnum } from '~modules/sensor/enum/sensor-types.enum';
import { Sensor } from '~modules/sensor/sensor.entity';
import {
  SensorFixture,
  SensorFixtureInterface,
} from '~modules/sensor/sensor.fixture';
import { SensorService } from '~modules/sensor/sensor.service';
import { UserModule } from '~modules/user/user.module';
import { BoardTypeEnum } from '~utils/board-types.enum';

describe('SensorService', () => {
  let sensorService: SensorService;
  let module: TestingModule = null;
  let fixture: SensorFixtureInterface;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [SensorService],
      imports: [
        UserModule,
        TypeOrmModule.forRoot(),
        TypeOrmModule.forFeature([Sensor]),
      ],
    }).compile();

    sensorService = module.get<SensorService>(SensorService);
    fixture = await SensorFixture(module);
  }, 20000);

  it('should create a sensor', async () => {
    const data = plainToClass(SensorCreateDto, {
      name: 'A sensor name',
      displayName: 'Nm',
      boardType: BoardTypeEnum.FIREBEETLE_ESP8266,
      location: 'A location',
      measurementTypes: [MeasurementTypeEnum.GAS],
      timezone: 'Europe/Vienna',
      private: false,
      sensorTypes: [SensorTypeEnum.BME680],
    });

    await validateOrReject(data);
    const sensor = await sensorService.create(fixture.userRequest, data);
    expect(sensor).toBeDefined();
    //expect(sensor.measurementTypes).toEqual([MeasurementTypeEnum.GAS]);
    expect(sensor.timezone).toEqual('Europe/Vienna');
    expect(sensor.accessToken).toBeDefined();
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

  it('should delete a sensor', async () => {
    const success = await sensorService.delete(fixture.userRequest, {
      id: fixture.sensorOne.id,
    });

    expect(success).toEqual(true);
  });

  afterAll(async () => {
    await module.close();
  });
});
