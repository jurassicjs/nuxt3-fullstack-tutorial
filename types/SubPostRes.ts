import { IUser } from '~/types/IUser';
export type SubPostRes = {
    url :   string;
    user: IUser;
    shouldUpdateUser: boolean;
  };