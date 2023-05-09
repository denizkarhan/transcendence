import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./users";

@Entity({name:"mathHistories"})
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