<<<<<<< HEAD
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
=======
import { Column, Entity, JoinColumn, JoinTable, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
>>>>>>> f311df2900999bac66f8c9fec8d0aecbf1af6ed0
import { User } from "./users";

@Entity({name:"matchHistories"})
export class MatchHistories{

	@PrimaryGeneratedColumn()
	Id: number;

<<<<<<< HEAD
	@ManyToOne(()=>User, (user) => user.MachHistory)
	@JoinColumn()
=======
	@ManyToOne(()=>User, (user) => user.MatchHistory)
>>>>>>> f311df2900999bac66f8c9fec8d0aecbf1af6ed0
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