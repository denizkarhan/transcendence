import { HttpException, HttpStatus, Inject, Injectable, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { first } from 'rxjs';
import { CreateFriendsParam } from 'src/friends/utils/type';
import { Friend } from 'src/typeorm/entities/friends';
import { User } from 'src/typeorm/entities/users';
import { SerializedUser } from 'src/users/dtos/UserMapper';
import { UsersService } from 'src/users/service/users/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class FriendsService {
	constructor(@InjectRepository(Friend) private friendRepository: Repository<Friend>,
	private readonly userService: UsersService){
	}

	async getIsFriend(userName:string, friendName:string){
		const user = await this.userService.getUserByLogin(userName);
		const friend = await this.userService.getUserByLogin(friendName);
		const isFriend = await this.friendRepository.exist({where:{user:user, friend:friend}});
		if (isFriend)
			return true;
		return false;
	}

	async getFriends(userName : string){
		const user = await this.userService.getUserByLogin(userName);
		const friends = await this.friendRepository.find({where:{user:user}, relations:['friend']});
		if (!friends.length)
			throw new HttpException('you dont have any friends', HttpStatus.OK);
		return friends.map((fir)=>plainToClass(SerializedUser, fir.friend));
	}

	async getFollowers(userName:string){
		const user = await this.userService.getUserByLogin(userName);
		const friends = await this.friendRepository.find({where : {friend:user}, relations:['user']})
		return friends.map((fir)=>plainToClass(SerializedUser, fir.user));
	}

	async getFriendByName(name:string, userName: string){
		const user = await this.userService.getUserByLogin(userName);
		const friend = await this.userService.getUserByLogin(name);
		if (!friend || friend === undefined)
			return null;
		return await this.friendRepository.findOne({where:{user:user}, relations:['friend']});
	}

	async addFriend(userName:string, friendLogin:string){
		const user = await this.userService.getUserByLogin(userName);
		const friend = await this.userService.getUserByLogin(friendLogin);
		const isExist = await this.friendRepository.find({where:{user:user, friend:friend}})
		if (user === friend || isExist.length)
			return null;
		if (!friend) return null;
		return await this.friendRepository.save({
			user: user,
			friend: friend
		});
	}

	async deleteFriend(userName:string, friendLogin:string){
		const user = await this.userService.getUserByLogin(userName);
		const friend = await this.userService.getUserByLogin(friendLogin);
		const isExist = await this.friendRepository.find({where:{user:user, friend:friend}})
		if (!friend || !isExist) return null;
		return this.friendRepository.delete({friend:friend, user:user});
	}
}