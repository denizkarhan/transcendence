import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Request, UseFilters, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ExceptionHandleFilter } from 'src/exception-handle/exception-handle.filter';
import { UsersService } from 'src/users/service/users/users.service';
import { BlockUserDto } from '../dtos/block-user.dto';
import { UnBlockUserDto } from '../dtos/unblock-user.dto';
import { BlockUserService } from '../services/block-user.service';
import { JwtAuthGuard } from 'src/auth/utils/jwt-auth.guard';

@Controller('block-user')
@ApiTags('block-user')
@ApiBearerAuth()
export class BlockUserController {

    constructor(private blockUserService: BlockUserService) {}
    
    @Get(':username')
    async blockUser(@Param('username') username: string, @Request() req) {
        return await this.blockUserService.blockUser(req.user.Login, username);
    }

    @Get('unblock/:username')
    async unblockUser(@Param('username') username: string, @Request() req) {
        return await this.blockUserService.unblockUser(req.user.Login, username);
    }

    @Get('show/all')
    async getBlockedUsers(@Request() req) {
        return await this.blockUserService.blockedUsers(req.user.Login);
    }


    @Get('isBlock/:username/:friendname')
    async getIsBlock(@Param('username') username:string, @Param('friendname') friendname:string){
        const res = await this.blockUserService.isBlock(username, friendname);
        if (res)
            return {message:'Is Block', status:200};
        return {message: 'Is Not Block', status:200};
    }
}