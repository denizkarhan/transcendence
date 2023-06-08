import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToOne, JoinColumn, } from 'typeorm';
import { User } from './users';

@Entity()
export class Chatter {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ nullable: true })
    socketid: string;

    @OneToOne(()=>User)
    @JoinColumn()
    user: User;
}
