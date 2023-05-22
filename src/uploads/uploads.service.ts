import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from 'src/typeorm/entities/image';
import { Repository } from 'typeorm';

@Injectable()
export class UploadsService {
    // constructor(@InjectRepository(Image) private readonly imageRepository: Repository<Image>, ) {}

    // async getImage(id: number) {
    //     return await this.imageRepository.findOneBy({ id });
    // }

    // async createImage(image: Image) {
    //     return await this.imageRepository.save(image);
    // }

    // async deleteImage(id: number) {
    //     return await this.imageRepository.delete(id);
    // }
}
