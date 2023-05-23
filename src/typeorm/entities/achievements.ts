import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserAchievements } from "./userAchievements";

@Entity({name:"achivements"})
export class Achievements{

	@PrimaryGeneratedColumn()
	Id: number;

	@Column({unique:true})
	Achievement:string;

	@Column()
	CreatedAt: Date;

	@OneToMany(()=>(UserAchievements), (userAchievements) => (userAchievements.Achivement))
	UserAchievement : UserAchievements[];
}