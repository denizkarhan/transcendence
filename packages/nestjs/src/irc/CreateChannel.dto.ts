import { IsEmail, IsIdentityCard, IsNotEmpty, IsStrongPassword } from "class-validator";

export class CreateChannelDto {
    
    @IsNotEmpty()
    Name: string;

    @IsNotEmpty()
    isPublic: Boolean;

    @IsStrongPassword()
    password?: string;
}