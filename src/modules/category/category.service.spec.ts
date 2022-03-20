import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { AppModule } from '~app.module';
import {
  CategoryFixture,
  CategoryFixtureInterface,
} from '~modules/category/category.fixture';
import { CategoryService } from '~modules/category/category.service';
import { CategoryCreateDto } from '~modules/category/dto/category.create.dto';
import { CategoryUpdateDto } from '~modules/category/dto/category.update.dto';

describe('CategoryService', () => {
  let categoryService: CategoryService;
  let module: TestingModule = null;
  let fixture: CategoryFixtureInterface;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    categoryService = module.get<CategoryService>(CategoryService);
    fixture = await CategoryFixture(module);
  }, 20000);

  it('should create a category', async () => {
    const data = plainToClass(CategoryCreateDto, {
      name: 'A category name',
      protected: false,
    });

    await validateOrReject(data);
    const category = await categoryService.create(data);
    expect(category).toBeDefined();
    expect(category.name).toBeDefined();
  });

  it('should update a category', async () => {
    const data = plainToClass(CategoryUpdateDto, {
      name: 'A new location',
      protected: false,
    });

    await validateOrReject(data);
    const category = await categoryService.update(fixture.categoryOne.id, data);
    expect(category).toBeDefined();
    expect(category.name).toEqual('A new location');
  });

  it('should list categories', async () => {
    const categories = await categoryService.findAll(
      {},
      {},
      {
        limit: 20,
        page: 1,
      },
    );

    expect(categories.items.length).not.toBe(0);
  });

  it('should move a category up', async () => {
    const category = await categoryService.increaseInSequence(
      fixture.categoryOne.id,
    );

    expect(category.sequenceNo).toEqual(fixture.categoryOne.sequenceNo + 1);
  });

  it('should move a category down', async () => {
    const category = await categoryService.decreaseInSequence(
      fixture.categoryOne.id,
    );

    expect(category.sequenceNo).toEqual(fixture.categoryOne.sequenceNo);
  });

  it('should delete a category', async () => {
    const success = await categoryService.delete({
      id: fixture.categoryOne.id,
    });

    expect(success).toEqual(true);
  });

  afterAll(async () => {
    await module.close();
  });
});
