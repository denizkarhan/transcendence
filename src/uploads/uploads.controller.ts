import { Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UseFilters, UseInterceptors, UsePipes } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import multer from 'multer';
import { diskStorage } from 'multer';
import path from 'path';
import { Image } from 'src/typeorm/entities/image';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';
import { ExceptionHandleFilter } from 'src/exception-handle/exception-handle.filter';
import * as fs from 'fs';

export const storage = {
    storage: diskStorage({
        destination: './avatars', 
        filename: (req, file, cb) => {
            
            const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
            cb(null, `${randomName}${extname(file.originalname)}`)
            
            // const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
            // const extension: string = path.parse(file.originalname).ext;
            // cb(null, '${filename}${extension}');
        }
    })
}

@Controller('upload')
@ApiTags('uploads')
export class UploadsController {
    // constructor(@InjectRepository(Image) private readonly imageRepository: Repository<Image>, ) {}


    @Post()
    @UsePipes(new ParseFilePipe({
        validators: [
            new MaxFileSizeValidator({ maxSize: 50000 }),
            new FileTypeValidator({ fileType: 'image/jpeg' }),
        ]
    }))
    @UseInterceptors(FileInterceptor('file'))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    uploadFile(@UploadedFile(
        // new ParseFilePipe({
        //     validators: [
        //         new MaxFileSizeValidator({ maxSize: 50000 }),
        //         new FileTypeValidator({ fileType: 'image/jpeg' }),
        //     ]
        // })
    ) file: Express.Multer.File) {
        fs.writeFileSync('./avatars', file.buffer);
        // console.log(file);
    }
}