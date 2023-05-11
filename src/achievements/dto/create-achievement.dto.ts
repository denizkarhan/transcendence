import { IsNotEmpty } from "class-validator";

export class CreateAchievementDto {

	@IsNotEmpty()
	Achievement:string;
}
