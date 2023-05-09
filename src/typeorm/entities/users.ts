import { Column, Entity, NumericType, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Friend } from "./friends";
import { MatchHistories } from "./matchHistories";
import { UserAchievements } from "./userAchievements";
import { IsNotEmpty } from "class-validator";

@Entity({name: 'Users'})
export class User{
	@PrimaryGeneratedColumn()
	Id :number;

	@Column()
	FirstName: string;

	@Column()
	LastName: string;

	@Column({unique: true})
	Login: string;

	@Column({unique: true})
	Email: string;

	@Column()
	Status: number;

	@Column()
	Password:string;

	@Column()
	CreatedAt: Date;

	@Column()
	UpdatedAt: Date;

	@OneToMany(()=> Friend, (friend)=> friend.User)
	friend : Friend[];

	@OneToMany(()=> MatchHistories, (MachHistory)=> MachHistory.User)
	MachHistory : MatchHistories[];

	@OneToMany(()=> UserAchievements, (UserAchievement)=> UserAchievement.User)
	UserAchievement : UserAchievements[];
}