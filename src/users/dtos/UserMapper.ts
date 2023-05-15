import { Exclude } from "class-transformer";

export class SerializedUser{

	@Exclude()
	Password:string;

	constructor(partial : Partial<SerializedUser>){
		Object.assign(this, partial);
	}
}