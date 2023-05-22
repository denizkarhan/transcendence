export interface IAuthService{
	findUser(id :number) : Promise<any>;
}