import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./users";

@Entity({name:'friends'})
export class Friend{

	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(()=>User, (User) => User.friend)
	@JoinColumn()
	user: number;
	
	@ManyToOne(()=>User, (User) => User.friend)
	@JoinColumn()
	friend: User;

}