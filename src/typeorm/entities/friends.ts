import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./users";

@Entity({name:'friends'})
export class Friend{

	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(()=>User, (user) => user.Id)
	User: User;

	@Column()
	FriendId: number;
}