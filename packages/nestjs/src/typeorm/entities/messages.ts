import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity({ name: 'messages' })
export class Message {
    @PrimaryGeneratedColumn()
    Id : number;

    @Column()
    Sender : string;

    @Column()
    Receiver : string;

    @Column()
    Message : string;

    @Column()
    Time : Date;
}