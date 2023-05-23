import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blocks } from 'src/typeorm/entities/blocks';
import { User } from 'src/typeorm/entities/users';
import { Repository } from 'typeorm';
import { BlockUserParams, unBlockUserParams } from '../utils/types';

@Injectable()
export class BlockUserService {
    
    constructor(@InjectRepository(User) private userRepository: Repository<User>, @InjectRepository(Blocks) private blocksRepository: Repository<Blocks>) {}

    async blockUser(blockUserDetail: BlockUserParams) {
        
        const blockingUser = await this.userRepository.findOneBy({ Id: blockUserDetail.blockingUserId });
        const blockedUser = await this.userRepository.findOneBy({ Id: blockUserDetail.blockedUserId });

        const block = this.blocksRepository.create({
            blockingUser: blockingUser,
            blockedUser: blockedUser,
        })

        return this.blocksRepository.save(block);
    }

    async unblockUser(unblockUserDetails: unBlockUserParams) {

        this.blocksRepository.delete({
            blockingUser: { Id: unblockUserDetails.unblockingUserId },
            blockedUser: { Id: unblockUserDetails.unblockedUserId }
        })
    }

    async blockedUsers(id: number) {
        
        const user = await this.userRepository.findOneBy({ Id: id });

        return this.blocksRepository.find({
            relations: {
                blockedUser: true,
            },
            where: {
                blockingUser: {
                    Id: id,
                },
            },
        })
    }
}