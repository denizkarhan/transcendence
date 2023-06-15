import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blocks } from 'src/typeorm/entities/blocks';
import { User } from 'src/typeorm/entities/users';
import { Repository } from 'typeorm';
import { BlockUserParams, unBlockUserParams } from '../utils/types';
import { plainToClass } from 'class-transformer';
import { SerializedUser } from 'src/users/dtos/UserMapper';
import { UsersService } from 'src/users/service/users/users.service';

@Injectable()
export class BlockUserService {

    constructor(private userService: UsersService, @InjectRepository(Blocks) private blocksRepository: Repository<Blocks>) { }

    async blockUser(username: string, blockUserName: string) {
        if (await this.isBlock(username, blockUserName))
            throw new HttpException('Already Is Block', HttpStatus.NO_CONTENT);
        const user = await this.userService.getUserByLogin(username);
        const blockUser = await this.userService.getUserByLogin(blockUserName);
        if (!blockUser) throw new HttpException('Not Found', HttpStatus.NO_CONTENT);
        return await this.blocksRepository.save({
            blockingUser: user,
            blockedUser: blockUser
        });
    }

    async unblockUser(username: string, blockUserName: string) {
        if (!(await this.isBlock(username, blockUserName)))
            throw new HttpException('User Is Not Block', HttpStatus.NO_CONTENT);
        const user = await this.userService.getUserByLogin(username);
        const blockUser = await this.userService.getUserByLogin(blockUserName);
        if (!blockUser) throw new HttpException('Not Found', HttpStatus.NO_CONTENT);
        return await this.blocksRepository.delete({
            blockingUser: user,
            blockedUser: blockUser
        });
    }

    async blockedUsers(userName: string) {

        const user = await this.userService.getUserByLogin(userName);

        const result = await this.blocksRepository.find({
            where: { blockingUser: user }, relations: ['blockedUser']
        });
        return result.map((block) => plainToClass(SerializedUser, block.blockedUser))
    }

    async isBlock(userName: string, blockUserName: string) {
        const user = await this.userService.getUserByLogin(userName);
        const blockUser = await this.userService.getUserByLogin(blockUserName);

        return await this.blocksRepository.exist({ where: { blockingUser: blockUser, blockedUser: user } });
    }
}