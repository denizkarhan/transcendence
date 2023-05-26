import { Controller, Get, Param, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { UsersService } from 'src/users/service/users/users.service';
import { IrcService } from './irc.service';

@Controller('chat')
export class IrcController {
    
    constructor(private readonly ircService: IrcService) { }

    @Get('new-connection')
    async connectToIRC(@Req() req) {
        return await this.ircService.establishConnection(req.user.Login);
    }

    @Get('send-message')
    async sendMessage(@Req() req, @Param('receiver') name: string, @Param('message') msg: string) {
        return await this.ircService.sendMessage(req.user.Login ,name, msg);
    }
}