import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./users";

@Entity({ name: "blocks" })
export class Blocks {
    
    @PrimaryGeneratedColumn()
    Id: number;

    @ManyToOne(()=>User, (user) => user.Blocks)
    blockingUser: User;

    @ManyToOne(()=>User, (user) => user.Blocks)
    blockedUser: User;
}