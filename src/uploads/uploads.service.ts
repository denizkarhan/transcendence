import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Avatar } from '../typeorm/entities/avatar'

@Injectable()
export class UploadsService {
    constructor(@InjectRepository(Avatar) private readonly avatarRepository: Repository<Avatar>, ) {}

    async getImage(id: number) {
        return await this.avatarRepository.findOneBy({ id });
    }

    async createImage(image: Avatar) {
        return await this.avatarRepository.save(image);
    }

    async deleteImage(id: Avatar) {
        return await this.avatarRepository.delete(id);
    }
}
