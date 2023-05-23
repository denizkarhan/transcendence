import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:"achivements"})
export class Achievements{

	@PrimaryGeneratedColumn()
	Id: number;

	@Column({unique:true})
	Achievement:string;

	@Column()
	CreatedAt: Date;
}