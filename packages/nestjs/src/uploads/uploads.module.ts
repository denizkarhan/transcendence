import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Avatar } from 'src/typeorm/entities/avatar';
import { User } from 'src/typeorm/entities/users';
import { UsersModule } from 'src/users/users.module';
import { UploadsController } from './uploads.controller';
import { UploadsService } from './uploads.service';

@Module({
  imports: [MulterModule.register({
    dest: './avatars',
  }),TypeOrmModule.forFeature([Avatar]), UsersModule],
  controllers: [UploadsController],
  providers: [UploadsService],
  exports: [UploadsService]

})
export class UploadsModule {}