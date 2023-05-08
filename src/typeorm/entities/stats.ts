import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";

@Entity({name: "stats"})
export class Stats{

	@PrimaryGeneratedColumn()
	Id:number;

	@OneToOne(()=>User)
	@JoinColumn()
	User: User;

	@Column()
	LoseCount:number;

	@Column()
	WinCount:number;

	@Column()
	LadderLevel:number;
}