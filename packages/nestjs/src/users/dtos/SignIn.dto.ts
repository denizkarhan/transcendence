import { IsNotEmpty, IsStrongPassword } from "class-validator";

export class SignInDto{
	@IsNotEmpty()
	Login:string;

	@IsNotEmpty()
	@IsStrongPassword()
	Password:string;
}