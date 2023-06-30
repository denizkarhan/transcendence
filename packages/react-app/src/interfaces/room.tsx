import { ChatUser } from "./chatUser";
import { Message } from "./message";

export interface Room{
	IsPublic:boolean;
	RoomName:string;
	Password?:string;
	Messages:Message[];
	Users:ChatUser[];
}