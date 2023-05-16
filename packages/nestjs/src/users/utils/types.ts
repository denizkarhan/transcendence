
export type CreateUserParams = {

	FirstName: string;

	LastName: string;

	Login: string;

	Email: string;

	Password:string;
}

export type GetterUserParams = {

	FirstName: string;

	LastName: string;

	Login: string;

	Email: string;

}

export type UpdateUserParams = {
	FirstName: string;
	
	LastName: string;
	
	Password: string;
	
	Email: string;
}