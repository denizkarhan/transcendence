import { IsNotEmpty } from "class-validator";
import { PrimaryGeneratedColumn } from "typeorm";

export class CreateAchievementDto {

	@PrimaryGeneratedColumn()
	id: number;

	@IsNotEmpty()
	Achievement:string;
}
