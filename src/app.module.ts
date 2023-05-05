import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import "reflect-metadata";
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/entities/user';
import { UsersModule } from './users/users.module';

@Module({
  imports: [TypeOrmModule.forRoot({
	type: 'postgres',
	host: 'localhost',
	port: 5432,
	username: 'postgres',
	password: '1',
	database: 'ft_transcendence',
	entities: [User],
	synchronize: true,
  }), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
