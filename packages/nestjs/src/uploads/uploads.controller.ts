import { Controller, Get, HttpException, HttpStatus, Post, Request, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Avatar } from '../typeorm/entities/avatar'
import { UsersService } from 'src/users/service/users/users.service';
import { UploadsService } from './uploads.service';
import { JwtAuthGuard } from 'src/auth/utils/jwt-auth.guard';
import * as http from 'http';
import * as https from 'https';

export const imageFileFilter = (req, file, callback) => {
	if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
		return callback(new HttpException('Only image files are allowed!', HttpStatus.BAD_REQUEST), false);
	}
	callback(null, true);
};

export const editFileName = (req, file, callback) => {
	const name = file.originalname.split('.')[0];
	const fileExtName = extname(file.originalname);
	const randomName = Array(4)
		.fill(null)
		.map(() => Math.round(Math.random() * 16).toString(16))
		.join('');
	callback(null, `${name}-${randomName}${fileExtName}`);
};

export const storage = {
	storage: diskStorage({
		destination: './avatars',
		filename: editFileName,
	}),
	fileFilter: imageFileFilter,
	limits: {
		fileSize: 10000000,
	},
}

@Controller('upload-avatar')
@ApiTags('image')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UploadsController {

	constructor(private readonly avatarService: UploadsService, private readonly userService: UsersService,) { }

	@Post()
	@UseInterceptors(FileInterceptor('file', storage))
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
	async uploadFile(@UploadedFile() file: Express.Multer.File, @Request() req) {
		const ava = new Avatar;

		ava.name = file.originalname;
		ava.path = file.path;
		ava.user = await this.userService.findById(req.user.userId);
		this.avatarService.createImage(ava);
	}

	@Get('get-image')
	async serveAvatar(@Request() req, @Res() res) {
		const user = await this.userService.getUserByLogin(req.user.username);
		const ava = await this.avatarService.getUserAvatar(user);

		const isUrl = ava.path.startsWith('https' || 'http');
		if (!isUrl) {
			res.set('Content-type', 'image/png');
			res.sendFile(ava.path, {root : './'});
			return ;
		}
		const protocol = ava.path.startsWith('https') ? https : http;
		protocol.get(ava.path, (response) => {
			res.set('Content-Type', 'image/png');
			response.pipe(res);
		});
	}
}