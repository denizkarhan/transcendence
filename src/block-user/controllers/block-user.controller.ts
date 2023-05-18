import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, UseFilters } from '@nestjs/common';
import { ExceptionHandleFilter } from 'src/exception-handle/exception-handle.filter';
import { UsersService } from 'src/users/service/users/users.service';
import { BlockUserDto } from '../dtos/block-user.dto';
import { UnBlockUserDto } from '../dtos/unblock-user.dto';
import { BlockUserService } from '../services/block-user.service';

@Controller('block-user')
export class BlockUserController {

    constructor(private userService: UsersService, private blockUserService: BlockUserService) {}
    
    @Post('id/:id')
    @UseFilters(ExceptionHandleFilter)
    async blockUser(@Body() blockUserDto: BlockUserDto) {
        
        const user = await this.userService.getUserById(blockUserDto.blockingUserId);
        const user2 = await this.userService.getUserById(blockUserDto.blockedUserId);

        if (!user || !user2) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        return this.blockUserService.blockUser(blockUserDto);
    }

    @Post('unblock/id/:id')
    @UseFilters(ExceptionHandleFilter)
    async unblockUser(@Body() unblockUserDto: UnBlockUserDto) {

        const user = await this.userService.getUserById(unblockUserDto.unblockingUserId);
        const user2 = await this.userService.getUserById(unblockUserDto.unblockingUserId);

        if (!user || !user) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        return this.blockUserService.unblockUser(unblockUserDto);
    }

    @Get('show-all/:id')
    @UseFilters(ExceptionHandleFilter)
    async getBlockedUsers(@Param('id') id: number) {

        const user = await this.userService.getUserById(id);

        if (!user) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);  
        return this.blockUserService.blockedUsers(id);
    }

}