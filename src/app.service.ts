import { Injectable, Logger } from '@nestjs/common';

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
}
