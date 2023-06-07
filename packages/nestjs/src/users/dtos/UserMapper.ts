import { Exclude } from "class-transformer";

export class SerializedUser{

	@Exclude()
	Password:string;

	@Exclude()
	CreatedAt: Date;

	@Exclude()
	UpdatedAt: Date;

	@Exclude()
<<<<<<< HEAD
	Status:number;
=======
	TwoFactorSecret:string;
>>>>>>> main
	
	constructor(partial : Partial<SerializedUser>){
		Object.assign(this, partial);
	}
}