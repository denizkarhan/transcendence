import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Request, UseFilters, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ExceptionHandleFilter } from 'src/exception-handle/exception-handle.filter';
import { UsersService } from 'src/users/service/users/users.service';
import { BlockUserDto } from '../dtos/block-user.dto';
import { UnBlockUserDto } from '../dtos/unblock-user.dto';
import { BlockUserService } from '../services/block-user.service';
import { AuthenticatedGuard } from 'src/auth/utils/authenticated.guard';

@Controller('block-user')
@ApiTags('block-user')
@UseGuards(AuthenticatedGuard)
export class BlockUserController {

    constructor(private userService: UsersService, private blockUserService: BlockUserService) {}
    
    @Post('id/:id')
    @UseFilters(ExceptionHandleFilter)
    async blockUser(@Param('id') id: number, @Request() req) {
        
        const user = await this.userService.findById(req.user.Id);
        const user2 = await this.userService.findById(id);

        if (!user || !user2) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        return await this.blockUserService.blockUser({blockingUser : user, blockedUser: user2});
    }

    @Post('unblock/id/:id')
    @UseFilters(ExceptionHandleFilter)
    async unblockUser(@Param('id') id: number, @Request() req) {

        const user = await this.userService.findById(req.user.Id);
        const user2 = await this.userService.findById(id);

        if (!user || !user) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        return this.blockUserService.unblockUser({unblockingUser : user, unblockedUser: user2});
    }

    @Get('show-all')
    @UseFilters(ExceptionHandleFilter)
    async getBlockedUsers(@Request() req) {
        return await this.blockUserService.blockedUsers(req.user.Id);
    }

}