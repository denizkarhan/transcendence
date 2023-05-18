import { IsNotEmpty, IsStrongPassword } from "class-validator";

export class SignInDto{
	@IsNotEmpty()
	Email:string;

	@IsNotEmpty()
	@IsStrongPassword()
	Password:string;
}