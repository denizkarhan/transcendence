import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UsersService } from 'src/users/service/users/users.service';
import { CreateChannelDto } from './CreateChannel.dto';
import { JoinChannelDto } from './JoinChannel.dto';
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

    @Post('join-channel/')
    async joinChannel(@Body() joinChannelDto: JoinChannelDto) {
        return await this.ircService.joinChannel(joinChannelDto);
    }

    @Post('create-channel')
    async createChannel(@Body() createChannelDto : CreateChannelDto) {
        return await this.ircService.createChannel(createChannelDto);
    }

    @Get('leave-channel/:channelName')
    async leaveChannel(@Param('channelName') channelName: string) {
        return await this.ircService.leaveChannel(channelName);
    }
}
