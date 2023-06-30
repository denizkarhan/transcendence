import { ChatUser } from "./chatUser";


export interface Message{
	Id:number;
	Message:string;
	SendAt:Date;
	User:ChatUser;
}