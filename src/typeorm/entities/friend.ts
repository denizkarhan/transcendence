import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user";

@Entity({name:'friend'})
export class Friend{

	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(()=>User, (user) => user.Id)
	user: User;

	@Column()
	friendId: number;
}