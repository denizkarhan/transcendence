import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm"

@Entity({ name: 'channels' })
export class Channel {
    @PrimaryGeneratedColumn()
    Id : number;

    @Column()
    Name : string;

    @Column()
    Public : boolean;
}