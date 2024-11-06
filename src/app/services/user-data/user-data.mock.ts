import { guid } from '@datorama/akita';
import { IUser } from "../../entities/user";

export const USERS: IUser[] = [
    { id: guid(), name: 'name-1', active: true },
    { id: guid(), name: 'name-2', active: false },
];
