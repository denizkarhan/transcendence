import { Exclude } from "class-transformer";
import { User } from "src/typeorm/entities/users";

export class SerializedUser extends User{

	@Exclude()
	Password:string;

	@Exclude()
	CreatedAt: Date;

	@Exclude()
	UpdatedAt: Date;

	@Exclude()
	TwoFactorSecret:string;
	
	constructor(partial : Partial<SerializedUser>){
		super();
		Object.assign(this, partial);
	}
}