import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { MeasurementService } from '~modules/measurement/measurement.service';
import { MeasurementCreateDto } from '~modules/measurement/dto/measurement.create.dto';
import { MeasurementTypeEnum } from '~modules/measurement/enum/measurement-type.enum';
import {
  MeasurementFixture,
  MeasurementFixtureInterface,
} from '~modules/measurement/measurement.fixture';
import { v4 } from 'uuid';
import { SensorModule } from '~modules/sensor/sensor.module';
import { Test, TestingModuleBuilder, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeasurementRepository } from '~modules/measurement/measurement.repository';
import Measurement from '~modules/measurement/measurement.entity';
import { getConnection, createConnection } from 'typeorm';

describe('MeasurementService', () => {
  let measurementService: MeasurementService;
  let fixture: MeasurementFixtureInterface;
  let module: TestingModule = null;

  beforeAll(async () => {
    //await createConnection();

    const seed = v4();

    module = await Test.createTestingModule({
      providers: [MeasurementService],
      imports: [
        TypeOrmModule.forRoot(),
        TypeOrmModule.forFeature([Measurement, MeasurementRepository]),
        SensorModule,
      ],
    }).compile();

    measurementService = await module.get<MeasurementService>(
      MeasurementService,
    );
    fixture = await MeasurementFixture(module, { seed });
  }, 10000);

  it('should create a measurement', async () => {
    const data = plainToClass(MeasurementCreateDto, {
      measurement: 12.2,
      measurementType: MeasurementTypeEnum.GAS,
    });

    await validateOrReject(data);
    const measurement = await measurementService.create(
      fixture.sensorRequest,
      data,
    );
    expect(measurement).toBeDefined();
  });

  it('should create multiple measurements', async () => {
    const data = plainToClass(MeasurementCreateDto, {
      measurement: 12.2,
      measurementType: MeasurementTypeEnum.GAS,
    });
    await validateOrReject(data);

    await validateOrReject(data);
    const measurements = await measurementService.createMultiple(
      fixture.sensorRequest,
      { measurements: [data] },
    );
    expect(measurements[0]).toBeDefined();
  });

  it('should list measurements', async () => {
    const measurements = await measurementService.findAll({
      measurementType: MeasurementTypeEnum.GAS,
      createdAtRange: `${new Date().getFullYear()}`,
    });

    expect(measurements.items.length).not.toBe(0);
  });

  afterAll(async () => {
    //await getConnection().close();
    //await module.close();
  });
});
