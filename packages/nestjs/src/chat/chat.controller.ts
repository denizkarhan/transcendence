import { Controller, Get, Param, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from 'src/users/service/users/users.service';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';

@ApiTags('chat')
@Controller('chat')
export class ChatController {

    constructor(private chatService: ChatService, private readonly userService: UsersService, private chatGateway: ChatGateway) {}

    @Get('connect')
    async connnectToChat(@Req() req) {
        const user = await this.userService.findById(req.user.Id);
        const chat = this.chatService.chatRepository.create({
            user: user,
            socketid: null,
        });
        this.chatService.chatRepository.save(chat);
    }

    // @Get('/msg')
    // async sendMsg(@Param('message') message: string) {
    //     this.chatService.sendMessage(message);
    // }
}
