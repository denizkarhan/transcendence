import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { CreateFriendsParam } from 'src/friends/utils/type';
import { Friend } from 'src/typeorm/entities/friends';
import { User } from 'src/typeorm/entities/users';
import { SerializedUser } from 'src/users/dtos/UserMapper';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class FriendsService {
	private userRepository;

	constructor(@InjectRepository(Friend) private friendRepository: Repository<Friend>,
	private readonly dataSource : DataSource){
		this.userRepository = dataSource.getRepository(User);
	}

	async getFriends(id:number){
		const user = await this.userRepository.findOneBy({Id:id});
		if (!user) throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
		const friends = await this.friendRepository.find({where:{user:user}, relations:['friend']});
		return friends.map((fir)=>plainToClass(SerializedUser, fir.friend));
	}

	async getFriendById(userId:number, friendId:number){
		const user = await this.userRepository.findOneBy({Id:userId});
		const myFriend = await this.userRepository.findOneBy({Id:friendId});
		const friends = await this.friendRepository.find({
			where: {user:user, friend:myFriend },
			relations: ['friend'],
		  }); 
		  return friends.map((temp)=>plainToClass(SerializedUser, temp.friend));
	}

	async getFriendByName(name:string){
		const user = await this.userRepository.findOneBy({FirstName:name});
		if (!user) return;
		const friend = await this.friendRepository.findOne({where:{user:user}, relations:['friend']});
		return friend;
	}

	async addFriend(friendParam: CreateFriendsParam){
		const friend = await this.userRepository.findOneBy({Id: friendParam.FriendId});
		const user = await this.userRepository.findOneBy({Id: friendParam.UserId});
		await this.friendRepository.save({
			user: user,
			friend: friend
		});
		await this.friendRepository.save({
			user:friend,
			friend:user
		});
	}

	async deleteFriend(id: number){
		const friend = await this.userRepository.findOneBy({Id: id});
		return this.friendRepository.delete({friend:friend});
	}
}