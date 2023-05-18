import { Inject } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { AuthService } from "../Google/service/auth.service";
import { User } from "src/typeorm/entities/users";
import { APP_GUARD } from "@nestjs/core";
import { LocalAuthService } from "../local-auth/local-auth.service";
import { UsersService } from "src/users/service/users/users.service";


export class SesssionSerialaize extends PassportSerializer{
	constructor(@Inject('AUTH_SERVICE') private readonly userService: UsersService,){
		super();
	}

	serializeUser(user: User, done: Function) {
		console.log("Serialize --------------------");
		console.log(user);
		console.log("--------------------");
		user.Status = 1;
		done(null, user)
	}

	async deserializeUser(payload: User, done: Function) {
		
		console.log("Deserialize --------------------");
		console.log(payload);
		console.log("--------------------");
		const user = await this.userService.getUserById(payload.Id);
		return user ? done(null, user) : done(null, null);
	}
}