import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./users";

@Entity({name:'friends'})
export class Friend{

	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	userId: number;
	
	@ManyToOne(()=>User, (User) => User.friend)
	friend: User;

}