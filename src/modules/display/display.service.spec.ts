import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { AppModule } from '~app.module';
import {
  DisplayFixture,
  DisplayFixtureInterface,
} from '~modules/display/display.fixture';
import { DisplayService } from '~modules/display/display.service';
import { DisplayCreateDto } from '~modules/display/dto/display.create.dto';
import { DisplayUpdateDto } from '~modules/display/dto/display.update.dto';
import { DisplayTypeEnum } from '~modules/display/enum/display-types.enum';
import { MeasurementTypeEnum } from '~modules/measurement/enum/measurement-type.enum';

describe('DisplayService', () => {
  let displayService: DisplayService;
  let module: TestingModule = null;
  let fixture: DisplayFixtureInterface;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    displayService = module.get<DisplayService>(DisplayService);
    fixture = await DisplayFixture(module);
  }, 20000);

  it('should create a display', async () => {
    const data = plainToClass(DisplayCreateDto, {
      name: 'A display name',
      location: 'A location',
      sensorIds: [fixture.sensorOne.id],
      measurementTypes: Object.values(MeasurementTypeEnum),
      displayType: DisplayTypeEnum.NOKIA_PCD8544,
    });

    await validateOrReject(data);
    const display = await displayService.create(fixture.userRequest, data);
    expect(display).toBeDefined();
    expect(display.accessToken).toBeDefined();
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

  it('should delete a display', async () => {
    const success = await displayService.delete(fixture.userRequest, {
      id: fixture.displayOne.id,
    });

    expect(success).toEqual(true);
  });

  afterAll(async () => {
    await module.close();
  });
});
