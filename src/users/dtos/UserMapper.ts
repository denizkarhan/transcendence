import { Injectable } from "@nestjs/common";
import { User } from "src/typeorm/entities/users";
import { GetterUserParams } from "src/utils/type";

@Injectable()
export class UserMapper{

	toDto( user: User) : GetterUserParams {
		if (!user)
			throw new Error("User Not Found");
		  return {
			FirstName: user.FirstName,
			LastName: user.LastName,
			Login: user.Login, 
			Email: user.Email
		};
	}
}