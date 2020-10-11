import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { execSync } from 'child_process';
import { differenceInMinutes, format, fromUnixTime } from 'date-fns';
import * as fs from 'fs';
import * as Koofr from 'koofr';

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
export class AppService {
  private readonly logger = new Logger(AppService.name);

  //@Cron('0 12 * * MON')
  @Cron('0 16 * * *') // every day at 4pm
  // @Cron('45 * * * * *') // every 45 seconds
  async backupDatabase() {
    if (!process.env.KOOFR_API_BASE) {
      this.logger.debug('Skipping KOOFR upload');
      return;
    }

    const client = new Koofr(process.env.KOOFR_API_BASE);
    await client.authenticate(
      process.env.KOOFR_EMAIL,
      process.env.KOOFR_PASSWORD,
    );

    // get the mount point
    const mounts = await client.mounts();
    const mount = mounts[0];

    try {
      await client.filesMkdir(mount.id, '/', process.env.KOOFR_FOLDER);
    } catch (e) {
      // folder already exists
    }

    const filename = process.env.KOOFR_FILENAME;

    execSync(
      `pg_dump -Fc --no-owner -U ${process.env.DB_USERNAME} -h ${process.env.DB_HOST} ${process.env.DB_DATABASE} > ${filename}.dump`,
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
    let files: KoofrFile[] = await client.filesList(
      mount.id,
      `/${process.env.KOOFR_FOLDER}`,
    );
    this.logger.debug(files);

    // delete "old" files
    files.map(async (file: KoofrFile) => {
      const dateModified = fromUnixTime(file.modified / 1000);
      if (
        differenceInMinutes(new Date(), dateModified) >
          parseInt(process.env.KOOFR_REMOVE_OLDER_THAN, 10) &&
        file.name.includes(process.env.NODE_ENV) // make sure we don't delete production files from development
      ) {
        this.logger.debug('Removing file ' + file.name);
        await client.filesRemove(
          mount.id,
          `/${process.env.KOOFR_FOLDER}/${file.name}`,
        );
      }
    });
  }
}
