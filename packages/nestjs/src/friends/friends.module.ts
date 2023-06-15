import { Module } from '@nestjs/common';
import { FriendsService } from './service/friends/friends.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Friend } from 'src/typeorm/entities/friends';
import { FriendsController } from './controllers/friends/friends.controller';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/service/users/users.service';
import { User } from 'src/typeorm/entities/users';

@Module({
	imports:[TypeOrmModule.forFeature([Friend]), UsersModule],
	controllers: [FriendsController],
	providers: [FriendsService]
})
export class FriendsModule {}
