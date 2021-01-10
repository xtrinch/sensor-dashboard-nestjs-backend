import { parseISO } from "date-fns";
import { AbstractEntity } from "types/AbstractEntity";
import BoardTypeEnum from "types/BoardTypeEnum";
import { IotDeviceInterface } from "types/IotDeviceInterface";
import User, { UserId } from "types/User";

export type ForwarderId = number;

class Forwarder extends AbstractEntity implements IotDeviceInterface {
  constructor(s) {
    super(s);

    this.name = s?.name || "";
    this.id = s?.id;
    this.userId = s?.userId;
    this.user = s?.user ? new User(s.user) : null;
    this.location = s?.location;
    this.accessToken = s?.accessToken;
    this.lastSeenAt = s?.lastSeenAt ? parseISO(s.lastSeenAt) : null;
    this.numForwarded = s?.numForwarded;
    this.boardType = s?.boardType;
  }

  public id: ForwarderId;

  public name: string;

  public userId: UserId;

  public user: User;

  public location: string;

  public accessToken: string;

  public lastSeenAt: Date;

  public numForwarded: number;

  public boardType: BoardTypeEnum;

  public visible: boolean;

  public expanded: boolean;

  public private: boolean;
}

export default Forwarder;
