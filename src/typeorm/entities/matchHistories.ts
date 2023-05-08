import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";

@Entity({name:"mathHistory"})
export class MatchHistories{

	@PrimaryGeneratedColumn()
	Id: number;

	@ManyToOne(()=>User, (user) => user.Id)
	User: User;

	@Column()
	EnemyId:number;

	@Column()
	MatchResult:number;
	
}