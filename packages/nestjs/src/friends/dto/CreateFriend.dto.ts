import { IsNotEmpty } from "class-validator";

export class CreateFriendDto{

	@IsNotEmpty()
	UserId:number;

	@IsNotEmpty()
	FriendId:number;
}