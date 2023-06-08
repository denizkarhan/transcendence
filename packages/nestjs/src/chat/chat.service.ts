import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chatter } from 'src/typeorm/entities/chat';
import { UsersService } from 'src/users/service/users/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class ChatService {

    constructor(@InjectRepository(Chatter) public chatterRepository: Repository<Chatter>, private userService: UsersService) {}
 
    async sendMessage(message: string) {
        
    }
}
