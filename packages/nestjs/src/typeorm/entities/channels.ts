import { IsStrongPassword } from "class-validator";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm"

@Entity({ name: 'channels' })
export class Channel {
    @PrimaryGeneratedColumn()
    Id : number;

    @Column()
    Name : string;

    @Column({ type: 'boolean' })
    isPublic : Boolean;

    @Column({ nullable: true })
    password : string;
}