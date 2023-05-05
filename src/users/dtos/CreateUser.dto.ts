import { IsEmail, IsIdentityCard, IsNotEmpty } from "class-validator";

export class CreateUserDto {

	@IsNotEmpty()
	FirstName: string;

	@IsNotEmpty()
	LastName: string;

	@IsNotEmpty()
	Login: string;

	@IsEmail()
	@IsIdentityCard()
	@IsNotEmpty()
	Email: string;
}