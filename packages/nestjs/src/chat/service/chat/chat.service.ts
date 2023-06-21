import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { BlockUserService } from 'src/block-user/services/block-user.service';
import { GroupChatType } from 'src/chat/dto/GroupChat.dto';
import { GroupChat } from 'src/typeorm/entities/groupChat';
import { GroupChatUsers } from 'src/typeorm/entities/groupChatUsers';
import { GroupMessages } from 'src/typeorm/entities/GroupMessages';
import { SerializedUser } from 'src/users/dtos/UserMapper';
import { UsersService } from 'src/users/service/users/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class ChatService {
	constructor(@InjectRepository(GroupChat) private groupChatRepository: Repository<GroupChat>,
		@InjectRepository(GroupChatUsers) private groupChatUsersRepository: Repository<GroupChatUsers>,
		@InjectRepository(GroupMessages) private groupChatMessagesRepository: Repository<GroupMessages>,
		private userService: UsersService,
		private blockService: BlockUserService) { }


	async isExistRoom(roomName:string)
	{
		return await this.groupChatRepository.exist({where:{RoomName:roomName}});
	}

	async createRoom(groupChat: GroupChatType) {
		const admin = await this.userService.getUserByLogin(groupChat.Admin);
		const room = await this.groupChatRepository.save({
			IsPublic: groupChat.IsPublic,
			RoomName: groupChat.RoomName,
			Password: groupChat.Password
		});
		const user = await this.groupChatUsersRepository.save({ GroupChat: room, users: admin, isAdmin: true });
		const messages = await this.groupChatMessagesRepository.create({ Message: 'Created Room', GroupChat: room, SendAt: new Date(), User: user });
		await this.groupChatMessagesRepository.save(messages);
		return room;
	}

	async joinRoom(roomName: string, username: string) {
		const room = await this.groupChatRepository.findOneBy({ RoomName: roomName });
		const user = await this.userService.getUserByLogin(username);
		const chatUsers = await this.groupChatUsersRepository.create({
			GroupChat: room,
			users: user,
		});
		await this.groupChatUsersRepository.save(chatUsers);
	}

	async leaveRoom(roomName:string, username:string){
		const room = await this.groupChatRepository.findOneBy({ RoomName: roomName });
		const user = await this.userService.getUserByLogin(username);
		await this.groupChatUsersRepository.delete({GroupChat:room, users:user});
	}

	async changeRoomPassword(roomName: string, password: string, username: string) {
		const room = await this.groupChatRepository.findOneBy({ RoomName: roomName });
		const isAdmin = await this.userService.getUserByLogin(username);
		const roomUser = await this.groupChatUsersRepository.findOneBy({ GroupChat: room, users: isAdmin });
		if (!roomUser.isAdmin)
			return { msg: 'You cant do it' };
		room.Password = password;
		await this.groupChatRepository.save(room);
	}

	async sendMessage(roomName: string, userName: string, message: string) {
		const room = await this.groupChatRepository.findOneBy({ RoomName: roomName });
		const user = await this.userService.getUserByLogin(userName);
		const isExist = await this.groupChatUsersRepository.findOneBy({ users: user, GroupChat: room });
		if (!isExist)
			return { message: 'you cant send messages', status:301};
		await this.groupChatMessagesRepository.save({ GroupChat: room, Message: message, SendAt: new Date(), User: isExist });
		return { message: 'Success', status:200 };
	}

	async privateMessage(roomName: string, sender: string, receiver: string, message: string) {
		const user1 = await this.userService.getUserByLogin(sender);
		const user2 = await this.userService.getUserByLogin(receiver);
		if (await this.blockService.isBlock(sender, receiver))
			return { msg: 'You cant send messages' };
		if (!user1 || !user2)
			return { msg: 'Users not found' };
		// const room1 = await this.groupChatRepository.exist({where:{RoomName: sender + receiver}});
		// const room2 = await this.groupChatRepository.exist({where:{RoomName: receiver + sender}});
		// await this.createRoom({
		// 	RoomName:sender + receiver,
		// 	Admin:sender,
		// 	IsPublic:false,
		// 	Password:null
		// });
		await this.sendMessage(roomName, sender, message);
	}

	async changeAdmin(roomName:string, admin:string, newAdmin:string){
		const room = await this.groupChatRepository.findOneBy({RoomName:roomName});
		const userAdmin = await this.userService.getUserByLogin(admin);
		const newAdminUser = await this.userService.getUserByLogin(newAdmin);
		const roomAdmin = await this.groupChatUsersRepository.findOneBy({users:userAdmin});
		const roomNewAdmin = await this.groupChatUsersRepository.findOneBy({users:newAdminUser});
		if (roomAdmin.isAdmin){	
			await this.groupChatUsersRepository.save({...roomNewAdmin, isAdmin:true});
			return {msg:'Success', status:200};
		}
		else
			return {msg:'You are not Admin', status:301};
	}

	// async mutedUser(username:string){
	// nasıl yapıcam???????
	// }

	async getMessage(username: string) {

		const user = await this.userService.getUserByLogin(username);
		const inGroup = await this.groupChatUsersRepository.find({ where: { users: user }, relations: ['GroupChat.Users.users', 'GroupChat.Messages'] });
		if (user) {
			return inGroup;
		}
		return [];
	}

	async deleteRoom(RoomName: string) {
		await this.groupChatRepository.createQueryBuilder()
			.delete()
			.where('RoomName :RoomName', { RoomName })
			.execute();
	}


}
