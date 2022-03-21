import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { execSync } from 'child_process';
import { differenceInMinutes, format, fromUnixTime } from 'date-fns';
import * as fs from 'fs';
import * as Koofr from 'koofr';
import { Config, CONFIG } from '~modules/config/config.factory';

interface KoofrFile {
  name: string;
  type: 'file';
  modified: number; // unix timestamp * 1000
  size: number;
  contentType: string;
  hash: string;
  tags: any;
}

@Injectable()
export class BackupService {
  private readonly logger = new Logger(BackupService.name);

  constructor(@Inject(CONFIG) public config: Config) {}

  //@Cron('0 12 * * MON')
  @Cron('0 16 * * *') // every day at 4pm
  // @Cron('45 * * * * *') // every 45 seconds
  async backupDatabase(): Promise<void> {
    if (!this.config.backup.apiBase) {
      this.logger.debug('Skipping KOOFR upload');
      return;
    }

    const client = new Koofr(this.config.backup.apiBase);
    await client.authenticate(
      this.config.backup.email,
      this.config.backup.password,
    );

    // get the mount point
    const mounts = await client.mounts();
    const mount = mounts[0];

    try {
      await client.filesMkdir(mount.id, '/', this.config.backup.folder);
    } catch (e) {
      // folder already exists
    }

    const filename = this.config.backup.filename;

    execSync(
      `pg_dump --column-inserts --data-only -Fc --no-owner -U ${process.env.TYPEORM_USERNAME} -h ${process.env.TYPEORM_HOST} -p ${process.env.TYPEORM_PORT} ${process.env.TYPEORM_DATABASE} > ${filename}.dump`,
    );

    // put the compressed dump on koofr
    const stream = fs.createReadStream(`${filename}.dump`);

    const createdFilename = `${filename}-${process.env.NODE_ENV}-${format(
      new Date(),
      'dd-MM-yyyy',
    )}.dump`;

    this.logger.debug('Creating file ' + createdFilename);
    await client.filesPut(
      mount.id,
      `/${process.env.KOOFR_FOLDER}`,
      createdFilename,
      stream,
    );

    // list all the files
    const files: KoofrFile[] = await client.filesList(
      mount.id,
      `/${this.config.backup.folder}`,
    );
    this.logger.debug(files);

    // delete "old" files
    files.map(async (file: KoofrFile) => {
      const dateModified = fromUnixTime(file.modified / 1000);
      if (
        differenceInMinutes(new Date(), dateModified) >
          this.config.backup.removeOlderThan &&
        file.name.includes(process.env.NODE_ENV) // make sure we don't delete production files from development
      ) {
        this.logger.debug('Removing file ' + file.name);
        await client.filesRemove(
          mount.id,
          `/${this.config.backup.folder}/${file.name}`,
        );
      }
    });
  }
}
