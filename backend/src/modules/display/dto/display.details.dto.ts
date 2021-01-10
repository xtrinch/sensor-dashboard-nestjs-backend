import { Display } from '~modules/display/display.entity';
import { DisplayDto } from '~modules/display/dto/display.dto';

export class DisplayDetailsDto extends DisplayDto {
  public accessToken: string;

  public static fromDisplay(display: Display): DisplayDetailsDto {
    return {
      ...DisplayDto.fromDisplay(display),
      accessToken: display.accessToken,
    };
  }
}
