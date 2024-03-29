import { Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Achievements } from "./achievements";
import { User } from "./users";

@Entity({name: "userAchievements"})
export class UserAchievements{
	
	@PrimaryGeneratedColumn()
	Id:number;

	@ManyToOne(()=>User, (user) => user.UserAchievement)
	@JoinColumn()
	User: User;

	@ManyToOne(()=>Achievements, (achi) => achi.userAchievement)
	@JoinColumn()
	Achievement: Achievements;
}