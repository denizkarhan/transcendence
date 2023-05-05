import { Column, Entity, NumericType, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'user'})
export class User{
	@PrimaryGeneratedColumn()
	Id :number;

	@Column()
	FirstName: string;

	@Column()
	LastName: string;

	@Column({unique: true})
	Login: string;

	@Column({unique: true})
	Email: string;

	@Column({nullable:true})
	Status: number;

	@Column()
	CreatedAt: Date;

	@Column()
	UpdatedAt: Date;
}