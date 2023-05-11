import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateFriendDto } from 'src/friends/dto/CreateFriend.dto';
import { Friend } from 'src/typeorm/entities/friends';
import { User } from 'src/typeorm/entities/users';
import { UsersService } from 'src/users/service/users/users.service';
import { CreateFriendParams } from 'src/utils/type';
import { Repository } from 'typeorm';

@Injectable()
export class FriendsService {
	constructor(@InjectRepository(Friend) private friendRepository: Repository<Friend>,
	@InjectRepository(User)
    private readonly userRepository: Repository<User>){}


	async getFriends(id:number){
		const friends = await this.friendRepository.find({
			where: { userId:id },
			relations: ['friend'],
		  });
	  
		  return friends;
	}

	async getFriendById(id:number){
		const friends = await this.friendRepository.find({
			where: { userId:id },
			relations: ['friend'],
		  });
	  
		  return friends;
	}

	async addFriend(friendParam : CreateFriendParams){
		const friend = await this.userRepository.findOneBy({Id: friendParam.FriendId});
		if (!friend) return;
		var user: Friend = await this.friendRepository.findOneBy({friend: friend});
		if (user != null) return user;
		user = new Friend();
		user.userId = friendParam.UserId;
		user.friend = friend;
		await this.friendRepository.save(user);
	}

	async deleteFriend(id: number){
		const friend = await this.userRepository.findOneBy({Id: id});
		return this.friendRepository.delete({friend:friend});
	}
}