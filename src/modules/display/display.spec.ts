import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { v4 } from 'uuid';
import { Display } from '~modules/display/display.entity';
import {
  DisplayFixture,
  DisplayFixtureInterface,
} from '~modules/display/display.fixture';
import { DisplayModule } from '~modules/display/display.module';
import { DisplayService } from '~modules/display/display.service';
import { DisplayCreateDto } from '~modules/display/dto/display.create.dto';
import { DisplayUpdateDto } from '~modules/display/dto/display.update.dto';
import { DisplayBoardTypesEnum } from '~modules/display/enum/display-board-types.enum';
import { MeasurementTypeEnum } from '~modules/measurement/enum/measurement-type.enum';
import { SensorModule } from '~modules/sensor/sensor.module';
import { UserModule } from '~modules/user/user.module';

describe('DisplayService', () => {
  let displayService: DisplayService;
  let module: TestingModule = null;
  let fixture: DisplayFixtureInterface;

  beforeAll(async () => {
    const seed = v4();

    module = await Test.createTestingModule({
      providers: [DisplayService],
      imports: [
        DisplayModule,
        UserModule,
        SensorModule,
        TypeOrmModule.forRoot(),
        TypeOrmModule.forFeature([Display]),
      ],
    }).compile();

    displayService = module.get<DisplayService>(DisplayService);
    fixture = await DisplayFixture(module, { seed });
  }, 20000);

  it('should create a display', async () => {
    const data = plainToClass(DisplayCreateDto, {
      name: 'A display name',
      location: 'A location',
      boardType: DisplayBoardTypesEnum.STM32F769NI,
      sensorIds: [fixture.sensorOne.id],
      measurementTypes: Object.values(MeasurementTypeEnum),
    });

    await validateOrReject(data);
    const display = await displayService.create(fixture.userRequest, data);
    expect(display).toBeDefined();
    expect(display.displayAccessToken).toBeDefined();
  });

  it('should update a display', async () => {
    const data = plainToClass(DisplayUpdateDto, {
      location: 'A new location',
    });

    await validateOrReject(data);
    const display = await displayService.update(
      fixture.userRequest,
      fixture.displayOne.id,
      data,
    );
    expect(display).toBeDefined();
    expect(display.location).toEqual('A new location');
  });

  it('should list displays', async () => {
    const displays = await displayService.findAll(
      {},
      {},
      {
        limit: 20,
        page: 1,
      },
    );

    expect(displays.items.length).not.toBe(0);
  });

  afterAll(async () => {
    await module.close();
  });
});
