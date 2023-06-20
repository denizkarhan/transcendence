import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { BlockUserService } from 'src/block-user/services/block-user.service';
import { Chat } from 'src/typeorm/entities/chat';
import { SerializedUser } from 'src/users/dtos/UserMapper';
import { UsersService } from 'src/users/service/users/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class ChatService {
    constructor(@InjectRepository(Chat) private chatRepository: Repository<Chat>, 
    private userService: UsersService,
    private blockService: BlockUserService)
    {}

    async sendMessage(roomName: string, userName:string, message:string){
        const user = await this.userService.getUserByLogin(userName);
        const chat = await this.chatRepository.create({
            Message:message,
            RoomName:roomName,
            SendAt: new Date(),
            user:user
        });
        await this.chatRepository.save(chat);
    }

    async getMessage(roomName:string){
        const chat = await this.chatRepository.find({where:{RoomName:roomName}, relations:['user']});
        chat.forEach((response) => {
            const updateUser = plainToClass(SerializedUser, response.user);
            response.user = updateUser;
        });
        return chat;
    }

    async deleteRoom(RoomName:string){
        await this.chatRepository.createQueryBuilder()
        .delete()
        .where('RoomName :RoomName', {RoomName})
        .execute();
    }


}
