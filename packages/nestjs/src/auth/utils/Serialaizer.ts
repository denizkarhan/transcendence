import { Inject } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { User } from "src/typeorm/entities/users";
import { SerializedUser } from "src/users/dtos/UserMapper";
import { UsersService } from "src/users/service/users/users.service";



export class SesssionSerialaize extends PassportSerializer{
	constructor(@Inject(UsersService) private readonly userService: UsersService,){
		super();
	}

	serializeUser(user: User, done: Function) {
		// console.log("Serialize --------------------");
		// console.log(user);
		// console.log("--------------------");
		const {Password, ...result} = user;
		done(null, result);
	}

	async deserializeUser(payload: User, done: Function) {
		
		const user = await this.userService.findById(payload.Id);
		const {Password, ...result} = user;
		// console.log("Deserialize --------------------");
		// console.log(result);
		// console.log("--------------------");
		return user ? done(null, result) : done(null, null);
	}
}