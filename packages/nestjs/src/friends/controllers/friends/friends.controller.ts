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

	constructor(private friendService: FriendsService) { }

	@Get('all')
	@UseInterceptors(ClassSerializerInterceptor)
	@UseFilters(ExceptionHandleFilter)
	async getFriends(@Request() req) {
		return await this.friendService.getFriends(req.user.Login);
	}

	@Get('usersFriend/:userName')
	@UseInterceptors(ClassSerializerInterceptor)
	async getFriendsByUserName(@Param('userName') userName: string) {
		console.log(userName);
		const friend = await this.friendService.getFriends(userName);
		if (!friend) throw new HttpException('Friend Not Found', HttpStatus.NO_CONTENT);
		return friend;
		
	}

	@Get('isFriend/:userName')
	@UseInterceptors(ClassSerializerInterceptor)
	async getIsFriend(@Param('userName') userName: string, @Request() req) {
		const friend = await this.friendService.getIsFriend(req.user.Login, userName);
		if (!friend) return {message:'OK', status:204};
		return {message:'OK', status:200};
	}

	@Get('followers/:username')
	@UseInterceptors(ClassSerializerInterceptor)
	@UseFilters(ExceptionHandleFilter)
	async getFollowers(@Param('username') username:string, @Req() req) {
		if (username === undefined)
			username = req.User.Login;
		return await this.friendService.getFollowers(username);
	}

	@Get('byname/:firstname')
	@UseInterceptors(ClassSerializerInterceptor)
	async getFriendByName(@Param('firstname') firstname: string, @Request() req) {
		const friend = await this.friendService.getFriendByName(firstname, req.user.Login);
		if (!friend) throw new HttpException('Friend Not Found', HttpStatus.NO_CONTENT);
		return new SerializedUser(friend.friend);
	}


	@Get('addfriend/:name')
	@UseFilters(ExceptionHandleFilter)
	async addFriend(@Param('name') name: string, @Request() req) {
		const res = await this.friendService.addFriend(req.user.Login, name);
		if (res !== null)
			return {message:'OK', status:200};
		if (!res) throw new HttpException('Something Is Wrong', HttpStatus.NO_CONTENT);
	}

	@Get('delete/:username')
	@UseFilters(ExceptionHandleFilter)
	async deleteFriend(@Param('username') username: string, @Request() req) {
		const response = await this.friendService.deleteFriend(req.user.Login, username)
		if (response !== null)
			return {message:'OK', status:200};
		throw new HttpException('User Not Found', HttpStatus.NO_CONTENT);
	}

}
