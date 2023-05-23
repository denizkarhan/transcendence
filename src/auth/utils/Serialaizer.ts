import { Inject } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { AuthService } from "../service/auth.service";
import { User } from "src/typeorm/entities/users";


export class SesssionSerialaize extends PassportSerializer{
	constructor(@Inject('AUTH_SERVICE') private readonly authService: AuthService){
		super();
	}

	serializeUser(user: User, done: Function) {
		user.Status = 1;
		done(null, user)
	}

	async deserializeUser(payload: User, done: Function) {
		// console.log(payload);
		const user = await this.authService.findUser(payload.Id);
		return user ? done(null, user) : done(null, null);
	}
}