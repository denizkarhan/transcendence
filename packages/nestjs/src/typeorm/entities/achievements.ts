import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Factory } from "nestjs-seeder"

@Entity({name:"achivements"})
export class Achievements{
	@PrimaryGeneratedColumn()
	Id: number;

	@Column({unique:true})
	Achievement:string;
}