import { IsNotEmpty } from "class-validator";
import { User } from "src/typeorm/entities/users";


export type GroupChatType = {

	RoomName:string;

	IsPublic:boolean;

	Admin:string;

	Password:string;

}