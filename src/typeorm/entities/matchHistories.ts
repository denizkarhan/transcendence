import { Column, Entity, JoinColumn, JoinTable, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./users";

@Entity({name:"matchHistories"})
export class MatchHistories{

	@PrimaryGeneratedColumn()
	Id: number;

	@ManyToOne(()=>User, (user) => user.MatchHistory)
	User: User;

	@ManyToOne(()=>User, (user) => user.MatchHistory)
	Enemy:number;

	@Column()
	MyResult:number;

	@Column()
	EnemyResult:number;

	@Column()
	MatchDate: Date;

	@Column({nullable:true})
	MatchResult:number;
	
}