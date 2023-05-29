import { Controller, Get, Param, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { UsersService } from 'src/users/service/users/users.service';
import { IrcService } from './irc.service';

@Controller('chat')
@ApiTags('chat')
export class IrcController {
    
    constructor(private readonly ircService: IrcService) { }

    @Get('new-connection')
    async connectToIRC(@Req() req) {
        return await this.ircService.establishConnection(req.user.Login);
    }

    @Get('send-message/:receiver/:message')
    async sendMessage(
        @Param('receiver') receiver: string,
        @Param('message') message: string, 
        @Req() req,) {
        console.log(receiver, message);
        return await this.ircService.sendMessage(req.user.Login ,receiver, message);
    }

    @Get('join-channel/:channelName')
    async joinChannel(@Param('channelName') channelName: string) {
        return await this.ircService.joinChannel(channelName);
    }

    @Get('create-channel/:channelName/:isPublic')
    async createChannel(
        @Param('channelName') channelName: string,
        @Param('isPublic') isPublic: boolean ) {
        return await this.ircService.createChannel(channelName, isPublic);
    }

    @Get('leave-channel/:channelName')
    async leaveChannel(@Param('channelName') channelName: string) {
        return await this.ircService.leaveChannel(channelName);
    }
}