import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./users";
import { Channel } from "./channels";

@Entity({ name: 'channeluserlist'})
export class ChannelUserList {
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    user : string;

    @Column()
    channel : string;

    @Column()
    isMuted: Boolean;
}