import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ChatService } from './chat.service';

@ApiTags('chat')
@Controller('chat')
export class ChatController {

    constructor(private readonly chatService: ChatService) {}

    @Get() 
    async sendMsg(@Param('message') message: string) {
        this.chatService.sendMessage(message);
    }
}
