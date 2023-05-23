import { Exclude } from "class-transformer";

export class SerializedUser{

	@Exclude()
	Password:string;

	@Exclude()
	CreatedAt: Date;

	@Exclude()
	UpdatedAt: Date;

	@Exclude()
	Status:number;
	
	constructor(partial : Partial<SerializedUser>){
		Object.assign(this, partial);
	}
}