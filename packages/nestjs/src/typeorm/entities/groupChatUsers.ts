import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { GroupChat } from "./groupChat";
import { GroupMessages } from "./GroupMessages";
import { User } from "./users";

@Entity({name:'groupchatusers'})
export class GroupChatUsers{

	@PrimaryGeneratedColumn()
	Id:number;

	@Column({default:false})
	isAdmin:boolean;

	@Column({default:false})
	isMuted:boolean;

	@ManyToOne(()=> GroupChat, (GroupChat)=>GroupChat.Users)
	GroupChat: GroupChat;

	@ManyToOne(()=> User, (User)=>User.GroupChatUsers)
    users:User;

	@OneToMany(() => GroupMessages, (GroupMessages)=>GroupMessages.User)
	groupUser:User[];
}