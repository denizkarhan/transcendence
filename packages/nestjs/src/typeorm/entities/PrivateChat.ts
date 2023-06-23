// import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
// import { User } from "./users";

// @Entity({name:'privatechat'})
// export class PrivateChat{

// 	@PrimaryGeneratedColumn()
// 	Id:number;

// 	@Column()
// 	Message:string;

// 	@Column()
// 	SendAt: Date;

// 	@ManyToOne(()=>User, (User) => User.Friend)
// 	user1: User;

// 	@ManyToOne(()=>User, (User) => User.Friend)
// 	user2: User;
// }