import { Body, ClassSerializerInterceptor, Controller, Get, Param, Post, UseFilters, UseInterceptors, UsePipes, ValidationPipe, Req, HttpException, HttpStatus } from '@nestjs/common';
import { ExceptionHandleFilter } from 'src/exception-handle/exception-handle.filter';
import { CreateFriendDto } from 'src/friends/dto/CreateFriend.dto';
import { FriendsService } from 'src/friends/service/friends/friends.service';
import { SerializedUser } from 'src/users/dtos/UserMapper';
import { Request } from 'express';

@Controller('friends')
export class FriendsController {

	constructor(private friendService: FriendsService){}

	@Get('all')
	@UseInterceptors(ClassSerializerInterceptor)
	@UseFilters(ExceptionHandleFilter)
	async getFriends(@Req() req : Request){
		return await this.friendService.getFriends(req.user);
	}

	@Get('byname/:firstname')
	@UseInterceptors(ClassSerializerInterceptor)
	@UseFilters(ExceptionHandleFilter)
	async getFriendByName(@Param('firstname') firstname: string){
		const friend = await this.friendService.getFriendByName(firstname);
		return new SerializedUser(friend.friend);
	}

	@Post('addfriend/:name')
	@UsePipes(new ValidationPipe())
	@UseFilters(ExceptionHandleFilter)
	async addFriend(@Param('name') name:string, @Req() req: Request){
		const res = await this.friendService.addFriend(req.user, name);
		if (!res) throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
	}

}
