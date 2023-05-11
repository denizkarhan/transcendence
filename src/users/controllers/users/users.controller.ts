import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UserMapper } from 'src/users/dtos/UserMapper';
import { UsersService } from 'src/users/service/users/users.service';
import { DataResult, Result } from 'src/utils/result';

//Global bir try-catch classı yaz
// class tryCatch {
// 	execute(func: () => any): Error | any {
// 	  try {
// 		return func();
// 	  } catch (err) {
// 		return new Error(err);
// 	  }
// 	}
//   }
@Controller('users')
export class UsersController {

	constructor(private userService: UsersService, private userMapper: UserMapper){}

	@Get(':userName')
	async getUserByName(@Param('userName') userName: string) {
		try {
			const user = await this.userService.getUserByName(userName);
			return new DataResult(this.userMapper.toDto(user), 200, 'Successfully');
		} catch (error) {
			return new Result(400, error.message);
		}
	}

	@Post()
	@UsePipes(new ValidationPipe())
	createUser(@Body() createUserDto : CreateUserDto) {
		try {
			this.userService.createUser(createUserDto);
			return new Result(200, "Successfully");	
		} catch (error) {
			return new Result(400,"Something Wrong");
		}
	}

}
