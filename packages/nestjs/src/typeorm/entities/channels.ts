import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./users";

@Entity({ name: 'channels' })
export class Channel {
    @PrimaryGeneratedColumn()
    Id : number;

    @Column()
    Name : string;

    @Column({ type: 'boolean' })
    isPublic : boolean;

    @Column({ nullable: true })
    password : string;

    @ManyToOne(()=>User, (user) => user.Channel)
    @JoinColumn()
    admin: User;
} 