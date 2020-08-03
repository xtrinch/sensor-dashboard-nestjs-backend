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
import { getWeek } from 'date-fns';

describe('MeasurementService', () => {
  let measurementService: MeasurementService;
  let fixture: MeasurementFixtureInterface;
  let module: TestingModule = null;

  beforeAll(async () => {
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
  }, 20000);

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

  it('should list measurements for current year', async () => {
    const resp = await measurementService.findAll({
      measurementTypes: [MeasurementTypeEnum.GAS],
      createdAtRange: `${new Date().getFullYear()}`,
    });

    expect(resp[MeasurementTypeEnum.GAS].length).not.toBe(0);
  });

  it('should list measurements for current year and current month', async () => {
    const resp = await measurementService.findAll({
      measurementTypes: [MeasurementTypeEnum.GAS],
      createdAtRange: `${new Date().getFullYear()}/${
        new Date().getMonth() + 1
      }`,
    });

    expect(resp[MeasurementTypeEnum.GAS].length).not.toBe(0);
  });

  it('should list measurements for current year, current month and current day', async () => {
    const resp = await measurementService.findAll({
      measurementTypes: [MeasurementTypeEnum.GAS],
      createdAtRange: `${new Date().getFullYear()}/${
        new Date().getMonth() + 1
      }/${new Date().getDate()}`,
    });

    expect(resp[MeasurementTypeEnum.GAS].length).not.toBe(0);
  });

  it('should list measurements for current year and week', async () => {
    const resp = await measurementService.findAll({
      measurementTypes: [MeasurementTypeEnum.GAS],
      createdAtRange: `${new Date().getFullYear()}/w${getWeek(new Date())}`,
    });

    expect(resp[MeasurementTypeEnum.GAS].length).not.toBe(0);
  });

  // it('should list measurements only with range supplied', async () => {
  //   const measurements = await measurementService.findAll({
  //     createdAtRange: `${new Date().getFullYear()}`,
  //   });

  //   expect(measurements.items.length).not.toBe(0);
  // });

  // it('should list measurements without query params', async () => {
  //   const measurements = await measurementService.findAll({});

  //   expect(measurements.items.length).not.toBe(0);
  // });

  afterAll(async () => {
    await module.close();
  });
});
