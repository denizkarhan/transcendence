import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateFriendDto } from 'src/friends/dto/CreateFriend.dto';
import { CreateFriendParams } from 'src/friends/utils/type';
import { Friend } from 'src/typeorm/entities/friends';
import { UsersService } from 'src/users/service/users/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class FriendsService {
	constructor(@InjectRepository(Friend) private friendRepository: Repository<Friend>){}

	async addFriend(friendParam : CreateFriendParams){
		const temp = this.friendRepository.create({...friendParam});
	}
}