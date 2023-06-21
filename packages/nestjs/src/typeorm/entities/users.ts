import { BeforeInsert, BeforeUpdate, Column, Entity, NumericType, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Friend } from "./friends";
import { MatchHistories } from "./matchHistories";
import { UserAchievements } from "./userAchievements";
import { IsNotEmpty } from "class-validator";
import { Blocks } from "./blocks";
import { Exclude } from "class-transformer";
import { GroupChat } from "./groupChat";
import { GroupChatUsers } from "./groupChatUsers";

@Entity({name: 'users'})
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

	@Column({default:'offline'})
	Status: string;

	@Column()
	Password:string;

	@Column({nullable:true})
	TwoFactorSecret:string;

	@Column({default:false})
	TwoFactorAuth: boolean;

	@Column()
	CreatedAt: Date;

	@Column()
	UpdatedAt: Date;

	@OneToMany(()=> Friend, (friend)=> friend.user)
	Friend : Friend[];

	@OneToMany(()=> MatchHistories, (MatchHistory)=> MatchHistory.User)
	MatchHistory : MatchHistories[];

	@OneToMany(()=> UserAchievements, (UserAchievement)=> UserAchievement.User)
	UserAchievement : UserAchievements[];

	@OneToMany(()=> Blocks, (Blocks)=> Blocks.blockedUser)
	Blocks: Blocks[];

	@OneToMany(()=>GroupChatUsers, (GroupChatUsers)=>GroupChatUsers.users)
	GroupChatUsers: GroupChatUsers[];

}