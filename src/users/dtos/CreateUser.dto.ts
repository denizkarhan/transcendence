import { IsEmail, IsIdentityCard, IsNotEmpty, IsStrongPassword } from "class-validator";

export class CreateUserDto {

	@IsNotEmpty()
	FirstName: string;

	@IsNotEmpty()
	LastName: string;

	@IsNotEmpty()
	Login: string;

	@IsEmail()
	@IsNotEmpty()
	Email: string;

	@IsStrongPassword()
	Password:string;
}