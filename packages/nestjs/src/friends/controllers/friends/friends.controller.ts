import { Body, ClassSerializerInterceptor, Controller, Get, Param, Post, UseFilters, UseInterceptors, UsePipes, ValidationPipe, Req, HttpException, HttpStatus, UseGuards, Request } from '@nestjs/common';
import { ExceptionHandleFilter } from 'src/exception-handle/exception-handle.filter';
import { CreateFriendDto } from 'src/friends/dto/CreateFriend.dto';
import { FriendsService } from 'src/friends/service/friends/friends.service';
import { SerializedUser } from 'src/users/dtos/UserMapper';
import { LocalAuthGuard } from 'src/auth/local-auth/local-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('friends')
@ApiTags('friends')
@ApiBearerAuth()
export class FriendsController {

	constructor(private friendService: FriendsService){}

	@Get('all')
	@UseInterceptors(ClassSerializerInterceptor)
	async getFriends(@Request() req){
		return await this.friendService.getFriends(req.user.Login);
	}

	@Get('usersFriend/:userName')
	@UseInterceptors(ClassSerializerInterceptor)
	async getFriendsByUserName(@Param('userName') userName: string){
		const friend = await this.friendService.getFriends(userName);
		if (!friend) throw new HttpException('Friend Not Found', HttpStatus.NOT_FOUND);
		return friend;
	}

	@Get('byname/:firstname')
	@UseInterceptors(ClassSerializerInterceptor)
	async getFriendByName(@Param('firstname') firstname: string, @Request() req){
		const friend = await this.friendService.getFriendByName(firstname, req.user.Login);
		if (!friend) throw new HttpException('Friend Not Found', HttpStatus.NOT_FOUND);
		return new SerializedUser(friend.friend);
	}
	

	@Post('addfriend/:name')
	@UsePipes(new ValidationPipe())
	@UseFilters(ExceptionHandleFilter)
	async addFriend(@Param('name') name:string, @Request() req){
		const res = await this.friendService.addFriend(req.user.Login, name);
			if (!res) throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
	}

}
