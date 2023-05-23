import { IsEmail, IsIdentityCard, IsNotEmpty, IsStrongPassword } from "class-validator";

export class UpdateUserDto {

	FirstName: string;

	LastName: string;

	Login: string;

	@IsEmail()
	Email: string;

	// @IsStrongPassword()
	// Password:string;
}