import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as IRC from 'irc';
import { mergeScan } from 'rxjs';
import { Channel } from 'src/typeorm/entities/channels';
import { Message } from 'src/typeorm/entities/message';
import { UsersService } from 'src/users/service/users/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class IrcService {
    private client: IRC.Client;

    constructor(@InjectRepository(Message) private messageRepository: Repository<Message>, @InjectRepository(Channel) private channelRepository: Repository<Channel>, private userService: UsersService, ) {}

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

    async joinChannel(channelName: string) {
        if (!(await this.channelRepository.findOneBy({ Name: channelName }))) {
            return HttpStatus.BAD_REQUEST;
        }
        else
            await this.client.join(channelName);
    }

    async createChannel(channelName: string, isPublic: boolean) {
        if (!(await this.channelRepository.findOneBy({ Name: channelName }))) {
            console.log(isPublic);
            const cha = this.channelRepository.create({
                Name: channelName,
                Public: true,
            });
            this.channelRepository.save(cha);
            await this.client.join(channelName);
        }
        else
            return HttpStatus.BAD_REQUEST;
    }

    async leaveChannel(channelName: string) {
        await this.client.leave(channelName);
    }
}
