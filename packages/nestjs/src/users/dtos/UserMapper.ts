import { Injectable } from "@nestjs/common";
import { User } from "src/typeorm/entities/users";
import { CreateUserParams } from "src/utils/type";

@Injectable()
export class UserMapper{

	toDto( user: User) : CreateUserParams {
		  return {
			FirstName: user.FirstName,
			LastName: user.LastName,
			Login: user.Login, 
			Email: user.Email
		};
	}
}