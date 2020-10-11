import { Inject, Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';

@Injectable()
export class TestUtils {
  constructor(
    @Inject('Connection') public connection: Connection
  ) {
    if (process.env.NODE_ENV !== 'test') {
      throw new Error('ERROR-TEST-UTILS-ONLY-FOR-TESTS');
    }
  }

  async getEntities() {
    const entities = [];
    (await (await this.connection).entityMetadatas).forEach(
      x => entities.push({name: x.name, tableName: x.tableName})
    );
    return entities;
  }

  async reloadFixtures() {
    this.connection.synchronize(true);

    const entities = await this.getEntities();
    await this.cleanAll(entities);
  }

  async cleanAll(entities) {
    try {
      for (const entity of entities) {
        const repository = await this.connection.getRepository(entity.name);
        await repository.query(`TRUNCATE TABLE "${entity.tableName}" CASCADE;`);
      }
    } catch (error) {
      throw new Error(`ERROR: Cleaning test db: ${error}`);
    }
  }
}