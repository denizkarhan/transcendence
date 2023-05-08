import { Column, Entity, NumericType, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Friend } from "./friend";
import { MatchHistories } from "./matchHistories";
import { UserAchievements } from "./userAchievements";

@Entity({name: 'user'})
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

	@Column({nullable:true})
	Status: number;

	@Column()
	CreatedAt: Date;

	@Column()
	UpdatedAt: Date;

	@OneToMany(()=> Friend, (friend)=> friend.user)
	friend : Friend[];

	@OneToMany(()=> MatchHistories, (MachHistory)=> MachHistory.User)
	MachHistory : MatchHistories[];

	@OneToMany(()=> UserAchievements, (UserAchievement)=> UserAchievement.User)
	UserAchievement : UserAchievements[];
}