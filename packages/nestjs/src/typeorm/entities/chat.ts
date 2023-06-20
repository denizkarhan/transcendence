import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./users";

@Entity({name:'chat'})
export class Chat{

    @PrimaryGeneratedColumn()
    Id:number;

    @Column()
    RoomName:string;

    @Column()
    Message:string;

    @Column()
    SendAt:Date;

    @ManyToOne(()=> User, (user)=>user.Chat)
    user:User;
}