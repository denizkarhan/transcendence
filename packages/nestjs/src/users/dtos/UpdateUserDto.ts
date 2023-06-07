import { IsEmail, IsIdentityCard, IsNotEmpty, IsStrongPassword } from "class-validator";

export class UpdateUserDto {

	FirstName?: string;

	LastName?: string;

	Login?: string;

	@IsEmail()
	Email?: string;

	Status?:string;

	TwoFactorSecret?:string;

	TwoFactorAuth?:boolean;
}