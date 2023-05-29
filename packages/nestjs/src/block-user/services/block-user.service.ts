import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blocks } from 'src/typeorm/entities/blocks';
import { User } from 'src/typeorm/entities/users';
import { Repository } from 'typeorm';
import { BlockUserParams, unBlockUserParams } from '../utils/types';
import { plainToClass } from 'class-transformer';
import { SerializedUser } from 'src/users/dtos/UserMapper';

@Injectable()
export class BlockUserService {
    
    constructor(@InjectRepository(User) private userRepository: Repository<User>, @InjectRepository(Blocks) private blocksRepository: Repository<Blocks>) {}

    async blockUser(blockUserDetail: BlockUserParams) {
        return await this.blocksRepository.save({
			blockingUser: blockUserDetail.blockingUser,
			blockedUser: blockUserDetail.blockedUser
		});
    }

    async unblockUser(unblockUserDetails: unBlockUserParams) {
        await this.blocksRepository.delete({
			blockingUser: unblockUserDetails.unblockingUser,
			blockedUser: unblockUserDetails.unblockedUser
		});
    }

    async blockedUsers(id:number) {
        
        const user = await this.userRepository.findOneBy({ Id: id });

        const result = await this.blocksRepository.find({
            where:{blockingUser:user}, relations:['blockedUser']
        });
		return result.map((block)=>plainToClass(SerializedUser, block.blockedUser))
    }
}