import { IsDefined } from 'class-validator';

export class DescriptionDto {
  @IsDefined()
  blocks: any[];

  @IsDefined()
  entityMap: any;
}
