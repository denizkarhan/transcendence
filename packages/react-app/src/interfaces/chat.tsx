import { User } from "./user";

export interface Chat{
    RoomName:string;
    Mesaage:string;
    SendAt:Date;
    user:User;
}