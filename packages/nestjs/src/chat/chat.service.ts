import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Channel } from 'src/typeorm/entities/channels';
import { UsersService } from 'src/users/service/users/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class ChatService {

    constructor(private userService: UsersService, @InjectRepository(Channel) private channelRepository: Repository<Channel>) {}
 
    async createRoom(data: any): Promise<Boolean> {
        if (await this.findChannel(data.roomName))
            return false;
        const cha = await this.channelRepository.create({
            Name: data.roomName,
            isPublic: data.isPublic,
            password: data.password
        });
        this.channelRepository.save(cha);
        return true;
    }

    async findChannel(name: string) {
        if (await this.channelRepository.findOneBy({Name: name}))
            return true;
        else
            return false;
    }

    async checkPass(name: string, pass: string): Promise<Boolean> {
        if ((await this.channelRepository.findOneBy({Name: name})).password === pass)
            return true;
        else
            return false;
    }

    async checkAuth(channelName: string, userName: string) {
        if (((await this.channelRepository.findOneBy({Name: channelName})).admin.Login) === userName)
            return true;
        else
            return false;
    }

    async updatePass(channelName: string, password: string) {
        (await this.channelRepository.findOneBy({Name: channelName})).password = password; 
    }
}