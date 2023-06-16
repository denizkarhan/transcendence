import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blocks } from 'src/typeorm/entities/blocks';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { SerializedUser } from 'src/users/dtos/UserMapper';
import { UsersService } from 'src/users/service/users/users.service';

@Injectable()
export class BlockUserService {

    constructor(private userService: UsersService, @InjectRepository(Blocks) private blocksRepository: Repository<Blocks>) { }

    async blockUser(username: string, blockUserName: string) {
        if ((await this.isBlock(username, blockUserName)))
            return { message: 'User Is Block', status: 204 };
        const user = await this.userService.getUserByLogin(username);
        const blockUser = await this.userService.getUserByLogin(blockUserName);
        await this.blocksRepository.save({
            blockingUser: user,
            blockedUser: blockUser
        });
        return { message: 'OK', status: 200 };
    }

    async unblockUser(username: string, blockUserName: string) {
        if (!(await this.isBlock(username, blockUserName)))
            return { message: 'User Is Not Block', status: 204 };
        const user = await this.userService.getUserByLogin(username);
        const blockUser = await this.userService.getUserByLogin(blockUserName);
        await this.blocksRepository.delete({
            blockingUser: user,
            blockedUser: blockUser
        });
        return { message: 'OK', status: 200 };
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
        return await this.blocksRepository.exist({ where: { blockingUser: user, blockedUser: blockUser } });
    }
}