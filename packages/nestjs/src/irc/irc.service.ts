import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { throws } from 'assert';
import { channel } from 'diagnostics_channel';
import * as IRC from 'irc';
import { mergeScan } from 'rxjs';
import { Channel } from 'src/typeorm/entities/channels';
import { ChannelUserList } from 'src/typeorm/entities/channelUserList';
import { Message } from 'src/typeorm/entities/message';
import { UsersService } from 'src/users/service/users/users.service';
import { Repository } from 'typeorm';
import { CreateChannelDto } from './CreateChannel.dto';
import { JoinChannelDto } from './JoinChannel.dto';

@Injectable()
export class IrcService {
    private client: IRC.Client;

    constructor(
    @InjectRepository(Message) private messageRepository: Repository<Message>,
    @InjectRepository(Channel) private channelRepository: Repository<Channel>,
    @InjectRepository(ChannelUserList) private channelUserRepository: Repository<ChannelUserList>,
    private userService: UsersService) {}

    async establishConnection(name: string) {
        
        const irc =  require('irc');
        const user = await this.userService.getUserByLogin(name);
        this.client =  new irc.Client('127.0.0.1', name, {
            username: 'ftuncer',
            port: 1234,
            userName: 'ftuncerz',
            realName: 'ftuncera',
            debug: true,
            showErrors: true,
        });
    }

    async sendMessage(sender: string, receiver: string, message: string) {
        const msg = this.messageRepository.create({
            Sender : sender,
            Receiver : receiver,
            Message : message,
            Time : new Date(),
        });
        this.messageRepository.save(msg);
        await this.client.say(receiver, message);
    }

    async joinChannel(joinDetails: JoinChannelDto) {
        if (!(await this.channelRepository.findOneBy({ Name: joinDetails.Name }))) {
            return HttpStatus.BAD_REQUEST;
        }
        else {
            if (await (await this.channelRepository.findOneBy({ Name: joinDetails.Name})).password == joinDetails.password)
                await this.client.join(joinDetails.Name);
            else
                return HttpStatus.BAD_REQUEST;
        }
    }

    async createChannel(channelDetail: CreateChannelDto) {
        if (!(await this.channelRepository.findOneBy({ Name: channelDetail.Name }))) {
            const cha = this.channelRepository.create({
                ...channelDetail,
            });
            this.channelRepository.save(cha);

            const newEntry = this.channelUserRepository.create({
                user: this.client.nick,
                channel: cha.Name,
                isMuted: false
            });
            this.channelUserRepository.save(newEntry);

            await this.client.join(channelDetail.Name);
            if (channelDetail.password)
                await this.client.say(channelDetail.Name, "/MODE +k " + channelDetail.password);
        }
        else
            return HttpStatus.BAD_REQUEST;
    }

    async leaveChannel(channelName: string) {
        this.channelUserRepository.delete({ user: this.client.nick, channel: channelName });
        await this.client.part(channelName);
    }
}