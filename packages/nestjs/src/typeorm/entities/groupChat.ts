import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { GroupChatUsers } from "./groupChatUsers";
import { GroupMessages } from "./GroupMessages";
import { User } from "./users";

@Entity({name:'chat'})
export class GroupChat{

    @PrimaryGeneratedColumn()
    Id:number;

    @Column()
    RoomName:string;

	@Column({default:false})
	IsPublic: boolean;

	@Column({nullable:true})
	Password:string;

	@OneToMany(() => GroupChatUsers, (GroupChatUsers)=>GroupChatUsers.GroupChat)
	Users: GroupChatUsers[];

	@OneToMany(()=>GroupMessages, (GroupMessages)=>GroupMessages.GroupChat)
	Messages:GroupMessages[];

}