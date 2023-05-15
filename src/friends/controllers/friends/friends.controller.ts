import { Body, ClassSerializerInterceptor, Controller, Get, Param, Post, UseFilters, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { ExceptionHandleFilter } from 'src/exception-handle/exception-handle.filter';
import { CreateFriendDto } from 'src/friends/dto/CreateFriend.dto';
import { FriendsService } from 'src/friends/service/friends/friends.service';
import { SerializedUser } from 'src/users/dtos/UserMapper';

@Controller('friends')
export class FriendsController {

	constructor(private friendService: FriendsService){}

	@Get('/:id')
	@UseInterceptors(ClassSerializerInterceptor)
	@UseFilters(ExceptionHandleFilter)
	async getFriends(@Param('id') id:number){
		return await this.friendService.getFriends(id);
	}

	@Get('byname/:firstname')
	@UseInterceptors(ClassSerializerInterceptor)
	@UseFilters(ExceptionHandleFilter)
	async getFriendByName(@Param('firstname') firstname: string){
		const friend = await this.friendService.getFriendByName(firstname);
		return new SerializedUser(friend.friend);
	}

	@Post('addFriend')
	@UsePipes(new ValidationPipe())
	addFriend(@Body() createFriendrDto : CreateFriendDto){
		this.friendService.addFriend(createFriendrDto);
	}

}
