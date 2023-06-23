import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { GroupChat } from "./groupChat";
import { GroupChatUsers } from "./groupChatUsers";
import { User } from "./users";

@Entity({name:'groupmessages'})
export class GroupMessages{

	@PrimaryGeneratedColumn()
	Id:number;

    @Column()
    SendAt:Date;
	
	@ManyToOne(()=>GroupChat, (GroupChat)=>GroupChat.Messages)
	GroupChat: GroupChat;

	@ManyToOne(()=>GroupChatUsers, (GroupChatUsers)=>GroupChatUsers.users)
	User: User;

	@Column()
	Message:string;
}
