import { ForwarderDto } from '~modules/forwarder/dto/forwarder.dto';
import { Forwarder } from '~modules/forwarder/forwarder.entity';

export class ForwarderDetailsDto extends ForwarderDto {
  public accessToken: string;

  public static fromForwarder(forwarder: Forwarder): ForwarderDetailsDto {
    return {
      ...ForwarderDto.fromForwarder(forwarder),
      accessToken: forwarder.accessToken,
    };
  }
}
