import { User } from '~modules/user/user.entity';

export interface UserAuthInterface {
  accessToken: string;
  user: User;
}
