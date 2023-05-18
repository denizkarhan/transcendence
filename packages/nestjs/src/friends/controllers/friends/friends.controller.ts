import { Body, ClassSerializerInterceptor, Controller, Get, Param, Post, UseFilters, UseInterceptors, UsePipes, ValidationPipe, Req, HttpException, HttpStatus, UseGuards, Request } from '@nestjs/common';
import { ExceptionHandleFilter } from 'src/exception-handle/exception-handle.filter';
import { CreateFriendDto } from 'src/friends/dto/CreateFriend.dto';
import { FriendsService } from 'src/friends/service/friends/friends.service';
import { SerializedUser } from 'src/users/dtos/UserMapper';
import { AuthenticatedGuard } from 'src/auth/local-auth/authenticated.guard';
import { LocalAuthGuard } from 'src/auth/local-auth/local-auth.guard';

@UseGuards(AuthenticatedGuard)
@Controller('friends')
export class FriendsController {

	constructor(private friendService: FriendsService){}

	@Get('all')
	@UseInterceptors(ClassSerializerInterceptor)
	// @UseGuards(AuthenticatedGuard)
	async getFriends(@Request() req){
		return await this.friendService.getFriends(req.user);
	}

	@Get('byname/:firstname')
	@UseInterceptors(ClassSerializerInterceptor)
	// @UseGuards(AuthenticatedGuard)
	async getFriendByName(@Param('firstname') firstname: string, @Request() req){
		const friend = await this.friendService.getFriendByName(firstname, req.user);
		if (!friend) throw new HttpException('Friend Not Found', HttpStatus.NOT_FOUND);
		return new SerializedUser(friend.friend);
	}
	

	@Post('addfriend/:name')
	@UsePipes(new ValidationPipe())
	@UseFilters(ExceptionHandleFilter)
	async addFriend(@Param('name') name:string, @Request() req){
		const res = await this.friendService.addFriend(req.user, name);
		if (!res) throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
	}

}
