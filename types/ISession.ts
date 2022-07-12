import { IUser } from "./IUser";

export interface ISession {
    authToken?: string;
    user?: IUser
}
