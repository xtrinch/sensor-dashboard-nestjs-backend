import { RadioDto } from '~modules/radio/dto/radio.dto';
import { Radio } from '~modules/radio/radio.entity';

export class RadioDetailsDto extends RadioDto {
  public accessToken: string;

  public static fromRadio(radio: Radio): RadioDetailsDto {
    return {
      ...RadioDto.fromRadio(radio),
      accessToken: radio.accessToken,
    };
  }
}
