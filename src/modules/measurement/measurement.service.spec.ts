import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { getWeek } from 'date-fns';
import { AppModule } from '~app.module';
import { MeasurementCreateDto } from '~modules/measurement/dto/measurement.create.dto';
import { MeasurementTypeEnum } from '~modules/measurement/enum/measurement-type.enum';
import {
  MeasurementFixture,
  MeasurementFixtureInterface,
} from '~modules/measurement/measurement.fixture';
import {
  DisplayMeasurementAggregateInterface,
  MeasurementAggregateInterface,
} from '~modules/measurement/measurement.interfaces';
import { MeasurementService } from '~modules/measurement/measurement.service';

describe('MeasurementService', () => {
  let measurementService: MeasurementService;
  let fixture: MeasurementFixtureInterface;
  let module: TestingModule = null;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    measurementService = await module.get<MeasurementService>(
      MeasurementService,
    );
    fixture = await MeasurementFixture(module);
  }, 20000);

  it('should create a measurement', async () => {
    const data = plainToClass(MeasurementCreateDto, {
      measurement: 12.2,
      measurementType: MeasurementTypeEnum.GAS,
    });

    await validateOrReject(data);
    const measurement = await measurementService.create(
      fixture.sensorRequest.sensor,
      data,
      fixture.sensorRequest.forwarder,
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
      fixture.sensorRequest.sensor,
      { measurements: [data] },
    );
    expect(measurements[0]).toBeDefined();
  });

  it('should create multiple measurements with timeAgo', async () => {
    const data = plainToClass(MeasurementCreateDto, {
      measurement: 12.2,
      measurementType: MeasurementTypeEnum.GAS,
      timeAgo: 60 * 60, // 1hr
    });
    await validateOrReject(data);

    await validateOrReject(data);
    const measurements = await measurementService.createMultiple(
      fixture.sensorRequest.sensor,
      { measurements: [data] },
    );
    expect(measurements[0]).toBeDefined();
  });

  it('should list measurements for current year', async () => {
    const resp = await measurementService.findAll({
      measurementTypes: [MeasurementTypeEnum.GAS],
      createdAtRange: `${new Date().getFullYear()}`,
      sensorIds: [fixture.sensorOne.id],
    });

    expect(resp[MeasurementTypeEnum.GAS].length).not.toBe(0);
  });

  it('should list measurements for current year and current month', async () => {
    const resp: MeasurementAggregateInterface =
      await measurementService.findAll({
        measurementTypes: [MeasurementTypeEnum.GAS],
        createdAtRange: `${new Date().getFullYear()}/${
          new Date().getMonth() + 1
        }`,
        sensorIds: [fixture.sensorOne.id],
      });

    expect(resp[MeasurementTypeEnum.GAS].length).not.toBe(0);
  });

  it('should list measurements for current year, current month and current day', async () => {
    const resp: MeasurementAggregateInterface =
      await measurementService.findAll({
        measurementTypes: [MeasurementTypeEnum.GAS],
        createdAtRange: `${new Date().getFullYear()}/${
          new Date().getMonth() + 1
        }/${new Date().getDate()}`,
        sensorIds: [fixture.sensorOne.id],
      });

    expect(resp[MeasurementTypeEnum.GAS].length).not.toBe(0);
  });

  it('should list measurements for current year and week', async () => {
    const resp: MeasurementAggregateInterface =
      await measurementService.findAll({
        measurementTypes: [MeasurementTypeEnum.GAS],
        createdAtRange: `${new Date().getFullYear()}/w${getWeek(new Date())}`,
        sensorIds: [fixture.sensorOne.id],
      });

    expect(resp[MeasurementTypeEnum.GAS].length).not.toBe(0);
  });

  it('should list latest measurements for display device', async () => {
    const resp: DisplayMeasurementAggregateInterface =
      await measurementService.getLatestMeasurements(
        fixture.displayRequest.display,
      );

    expect(
      resp[fixture.sensorOne.id].measurements[MeasurementTypeEnum.GAS],
    ).toBeDefined();
  });

  it('should create multiple measurements as a forwarder request', async () => {
    const data = plainToClass(MeasurementCreateDto, {
      measurement: 12.2,
      measurementType: MeasurementTypeEnum.GAS,
    });
    await validateOrReject(data);

    await validateOrReject(data);
    const measurements = await measurementService.createMultiple(
      fixture.forwarderRequest.sensor,
      { measurements: [data] },
      fixture.forwarderRequest.forwarder,
    );
    expect(measurements[0]).toBeDefined();
    expect(fixture.forwarderRequest.forwarder.numForwarded).toBeGreaterThan(0);
  });

  afterAll(async () => {
    await module.close();
  });
});
