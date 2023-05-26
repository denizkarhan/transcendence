import { Injectable } from '@nestjs/common';
import * as IRC from 'irc';
import { UsersService } from 'src/users/service/users/users.service';

@Injectable()
export class IrcService {

    constructor(private userService: UsersService, ) {}

    async establishConnection(name: string) {
        
        const irc =  require('irc');
        const user = await this.userService.getUserByLogin(name);
        const client =  new irc.Client('127.0.0.1', name, {
            username: 'ftuncer',
            port: 1234,
            userName: 'ftuncerz',
            realName: 'ftuncera',
            debug: true,
            showErrors: true,
        });

        user.Client = client;

        // const sleep = (ms) => new Promise(r => setTimeout(r, ms));
        // console.log('1');
        // await sleep(2000);
        // console.log('2');
    }

    async sendMessage(sender: string, receiver: string, msg: string) {
        const user = await this.userService.getUserByLogin(sender);
        await user.Client.say(receiver, msg);
    }
}
