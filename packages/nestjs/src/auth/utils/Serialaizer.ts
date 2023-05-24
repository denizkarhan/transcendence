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
		user.Status = 1;
		const {Password, ...result} = user;
		done(null, result);
	}

	async deserializeUser(payload: User, done: Function) {
		
		// console.log("Deserialize --------------------");
		// console.log(payload);
		// console.log("--------------------");
		const user = await this.userService.findById(payload.Id);
		const {Password, ...result} = user;
		return user ? done(null, result) : done(null, null);
	}
}