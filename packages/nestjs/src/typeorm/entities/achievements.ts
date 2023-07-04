import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Factory } from "nestjs-seeder"
import { UserAchievements } from "./userAchievements";

@Entity({name:"achivements"})
export class Achievements{
	@PrimaryGeneratedColumn()
	Id: number;

	@Column({unique:true})
	Achievement:string;

	@OneToMany(()=> UserAchievements, (userAchi)=> userAchi.Achievement)
	userAchievement: UserAchievements;
}