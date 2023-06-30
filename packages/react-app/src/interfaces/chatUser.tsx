import { User } from "./user";

export interface ChatUser{
	isAdmin:boolean;
	isMuted:boolean;
	users:User;
}