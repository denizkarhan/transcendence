import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/users';
import { Repository } from 'typeorm';
import { Avatar } from '../typeorm/entities/avatar'
<<<<<<< HEAD
=======
import { UsersService } from 'src/users/service/users/users.service';
>>>>>>> main

@Injectable()
export class UploadsService {
    constructor(@InjectRepository(Avatar) private readonly avatarRepository: Repository<Avatar>, ) {}

    async getImage(id: number) {
        return await (await this.avatarRepository.findOneBy({ id }));
    }

    async createImage(image: Avatar) {
        return await this.avatarRepository.save(image);
    }

<<<<<<< HEAD
=======
	async updateImage(image: Avatar) {
        const oldAvatar = await this.getUserAvatar(image.user);
        const newAvatar = await this.avatarRepository.create({
            id:oldAvatar.id,
            user:oldAvatar.user,
            path:image.path,
            name: image.name
        });
        return await this.avatarRepository.save(newAvatar);
    }

>>>>>>> main
    async deleteImage(id: Avatar) {
        return await this.avatarRepository.delete(id);
    }

    async getUserAvatar(user: User) {
        return await this.avatarRepository.findOneBy({ user: user });
    }
}
