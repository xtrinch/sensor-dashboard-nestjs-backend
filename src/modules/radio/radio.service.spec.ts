import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { AppModule } from '~app.module';
import { RadioCreateDto } from '~modules/radio/dto/radio.create.dto';
import { RadioUpdateDto } from '~modules/radio/dto/radio.update.dto';
import {
  RadioFixture,
  RadioFixtureInterface
} from '~modules/radio/radio.fixture';
import { RadioService } from '~modules/radio/radio.service';
import { BoardTypeEnum } from '~utils/board-types.enum';

describe('RadioService', () => {
  let radioService: RadioService;
  let module: TestingModule = null;
  let fixture: RadioFixtureInterface;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        AppModule
      ],
    }).compile();

    radioService = module.get<RadioService>(RadioService);
    fixture = await RadioFixture(module);
  }, 20000);

  it('should create a radio', async () => {
    const data = plainToClass(RadioCreateDto, {
      name: 'A radio name',
      location: 'A location',
      boardType: BoardTypeEnum.DOIT_ESP32_DEVKIT_V1,
    });

    await validateOrReject(data);
    const radio = await radioService.create(fixture.userRequest, data);
    expect(radio).toBeDefined();
    expect(radio.accessToken).toBeDefined();
  });

  it('should update a radio', async () => {
    const data = plainToClass(RadioUpdateDto, {
      location: 'A new location',
    });

    await validateOrReject(data);
    const radio = await radioService.update(
      fixture.userRequest,
      fixture.radioOne.id,
      data,
    );
    expect(radio).toBeDefined();
    expect(radio.location).toEqual('A new location');
  });

  it('should list radios', async () => {
    const radios = await radioService.findAll(
      {},
      {},
      {
        limit: 20,
        page: 1,
      },
    );

    expect(radios.items.length).not.toBe(0);
  });

  it('should delete a radio', async () => {
    const success = await radioService.delete(fixture.userRequest, {
      id: fixture.radioOne.id,
    });

    expect(success).toEqual(true);
  });

  it('should ping as a radio', async () => {
    const success = await radioService.registerPing(
      fixture.radioRequest,
    );

    expect(success).toEqual(true);
  });

  afterAll(async () => {
    await module.close();
  });
});
