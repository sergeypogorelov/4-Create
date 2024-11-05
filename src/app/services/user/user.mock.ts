import * as uniqid from 'uniqid';
import { IUser } from "../../entities/user";

export const USERS: IUser[] = [
    { id: uniqid(), name: 'name-1', active: true },
    { id: uniqid(), name: 'name-2', active: false },
];
