import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateFriendDto } from 'src/friends/dto/CreateFriend.dto';
import { FriendsService } from 'src/friends/service/friends/friends.service';

@Controller('friends')
export class FriendsController {

	constructor(private friendService: FriendsService){}

	@Get(':id/friends')
	async getFriends(@Param('id') id:number){
		return await this.friendService.getFriends(id);
	}

	@Post('addFriend')
	@UsePipes(new ValidationPipe())
	addFriend(@Body() createFriendrDto : CreateFriendDto){
		this.friendService.addFriend(createFriendrDto);
	}

}
