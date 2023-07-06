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


	async isExistRoom(roomName: string) {
		return await this.groupChatRepository.exist({ where: { RoomName: roomName } });
	}

	async isJoin(RoomName: string, UserName: string) {
		const user = await this.userService.getUserByLogin(UserName);
		const room = await this.groupChatRepository.findOneBy({ RoomName: RoomName });

		const response = await this.groupChatUsersRepository.exist({ where: { GroupChat: room, users: user } });
		// console.log("isJoin ", response);
		return response;
	}

	async createRoom(groupChat: GroupChatType) {
		// console.log("groupChat ", groupChat.Admin);
		const admin = await this.userService.getUserByLogin(groupChat.Admin);
		const room = await this.groupChatRepository.save({
			IsPublic: groupChat.IsPublic,
			RoomName: groupChat.RoomName,
			Password: groupChat.Password
		});
		const user = await this.groupChatUsersRepository.save({ GroupChat: room, users: admin, isAdmin: true });
		const messages = this.groupChatMessagesRepository.create({ Message: 'Created Room', GroupChat: room, SendAt: new Date(), User: user });
		await this.groupChatMessagesRepository.save(messages);
		return room;
	}

	async joinRoom(roomName: string, username: string, password: string) {
		const room = await this.groupChatRepository.findOneBy({ RoomName: roomName });
		if (password !== undefined && password !== room.Password)
			return { status: 403, message: 'Wrong Password' };
		const user = await this.userService.getUserByLogin(username);

		if (!(await this.groupChatUsersRepository.exist({ where: { GroupChat: room, users: user } }))) {
			const chatUsers = this.groupChatUsersRepository.create({
				GroupChat: room,
				users: user,
			});
			await this.groupChatUsersRepository.save(chatUsers);
		}
		return { status: 200, message: 'OK' };
	}

	async leaveRoom(roomName: string, username: string) {
		const room = await this.groupChatRepository.findOneBy({ RoomName: roomName });
		const user = await this.userService.getUserByLogin(username);
		await this.groupChatUsersRepository.delete({ GroupChat: room, users: user });
	}

	async updateRoom(data: any, userName: string, oldName: string) {
		const room = await this.groupChatRepository.findOneBy({ RoomName: oldName });
		console.log(room);
		const updateRoom = this.groupChatRepository.create({ ...room, ...data })
		const isAdmin = await this.userService.getUserByLogin(userName);
		const roomUser = await this.groupChatUsersRepository.findOneBy({ GroupChat: room, users: isAdmin });
		console.log(roomUser);
		if (!roomUser.isAdmin)
			return { status: 204 };
		const newRoom = await this.groupChatRepository.save(updateRoom);
		return { status: 200, data: newRoom };
	}

	async sendMessage(roomName: string, userName: string, message: string) {
		const room = await this.groupChatRepository.findOneBy({ RoomName: roomName });
		const user = await this.userService.getUserByLogin(userName);
		const isExist = await this.groupChatUsersRepository.findOneBy({ users: user, GroupChat: room });
		console.log("is mute------------>",isExist.isMuted);
		if (!isExist || isExist.isMuted)
			return null;
		await this.groupChatMessagesRepository.save({ GroupChat: room, Message: message, SendAt: new Date(), User: isExist });
		const response = await this.groupChatMessagesRepository.find({ where: { GroupChat: room, User: isExist }, relations: ['User.users'], order: { Id: 'DESC' } });
		return response.at(0);
	}

	async privateMessage(roomName: string, sender: string, message: string) {
		const user1 = await this.userService.getUserByLogin(sender);
		const room = await this.groupChatRepository.findOneBy({RoomName:roomName});
		const chatUsers = await this.groupChatUsersRepository.find({where:{GroupChat:room}, relations:['users']});
		const user2 = chatUsers.find(user=> user.users.Login !== user1.Login).users;
		
		if (await this.blockService.isBlock(user2.Login, sender))
			return null
		const response = await this.sendMessage(roomName, sender, message);
		return {send:response, receiver:user2};
	}


	async changeAdmin(roomName: string, admin: string, newAdmin: string) {
		const room = await this.groupChatRepository.findOneBy({ RoomName: roomName });
		const userAdmin = await this.userService.getUserByLogin(admin);
		const newAdminUser = await this.userService.getUserByLogin(newAdmin);
		const roomAdmin = await this.groupChatUsersRepository.findOneBy({ users: userAdmin });
		const roomNewAdmin = await this.groupChatUsersRepository.findOneBy({ users: newAdminUser });
		if (roomAdmin.isAdmin) {
			await this.groupChatUsersRepository.save({ ...roomNewAdmin, isAdmin: true });
			return { msg: 'Success', status: 200 };
		}
		else
			return { msg: 'You are not Admin', status: 301 };
	}


	async mutedUser(username:string, roomname:string){
		const user = await this.userService.getUserByLogin(username);
		const room = await this.groupChatRepository.findOneBy({RoomName:roomname});
		const chatUser = await this.groupChatUsersRepository.findOneBy({GroupChat:room, users:user});
		await this.groupChatUsersRepository.save({...chatUser, isMuted :true});
	}

	async unMutedUser(username:string, roomname:string){
		const user = await this.userService.getUserByLogin(username);
		const room = await this.groupChatRepository.findOneBy({RoomName:roomname});
		const chatUser = await this.groupChatUsersRepository.findOneBy({GroupChat:room, users:user});
		await this.groupChatUsersRepository.save({...chatUser, isMuted :false});
	}

	async getPrivateRoom(sender: string, receiver: string) {
		console.log(sender, receiver);
		const me = await this.userService.getUserByLogin(sender);
		const rec = await this.userService.getUserByLogin(receiver);

		if (!rec)
			return null;
		let groupUser = await this.groupChatUsersRepository.findOneBy({ users: me });
		let groupUserRec = await this.groupChatUsersRepository.findOneBy({ users: rec });
		const myRoom = await this.groupChatRepository.findOne({where:{RoomName: sender+receiver}, relations: ['Messages.User.users', 'Messages', 'Users.users']});
		const other = await this.groupChatRepository.findOne({where:{RoomName: receiver+sender}, relations: ['Messages.User.users', 'Messages', 'Users.users']});

		const targetRoom = myRoom !== null ? myRoom : other;
		if (targetRoom)
			return targetRoom;
		else{
			const room = await this.createRoom({
				RoomName: sender + receiver,
				Admin: sender,
				IsPublic: false,
				Password: null
			});
			await this.joinRoom(room.RoomName, receiver, null);
			if (!groupUser)
				groupUser = await this.groupChatUsersRepository.findOneBy({ users: me });
			return room;
		}
		
	}

	async getRoom(roomName: string) {
		return await this.groupChatRepository.findOne({ where: { RoomName: roomName }, relations: ['Messages.User.users', 'Messages', 'Users.users'], order: { Id: 'DESC' } });
	}

	async getRooms(username: string) {
		const user = await this.userService.getUserByLogin(username);
		return await this.groupChatUsersRepository.find({ where: { users: user }, relations: ['GroupChat'] })
	}

	async getMessage(username: string) {
		const user = await this.userService.getUserByLogin(username);
		const inGroup = await this.groupChatUsersRepository.find({ where: { users: user }, relations: ['GroupChat.Messages.User.users', 'GroupChat.Messages', 'GroupChat.Users.users'], order: { Id: 'DESC' } });
		const groupChats = inGroup.map((group) => {
			return group.GroupChat;
		});
		if (user) {
			return groupChats;
		}
		return [];
	}

	async getPublic() {
		return await this.groupChatRepository.find({ where: { IsPublic: true }, relations: ['Messages.User.users', 'Messages', 'Users.users'], order: { Id: 'DESC' } });
	}

	async deleteRoom(RoomName: string) {
		const room = await this.groupChatRepository.findOneBy({ RoomName: RoomName });
		await this.groupChatMessagesRepository.delete({ GroupChat: room });
		await this.groupChatUsersRepository.delete({ GroupChat: room });
		await this.groupChatRepository.delete({ RoomName: RoomName });
	}

	async kickUser(userName: string, roomName: string) {
		const user = await this.userService.getUserByLogin(userName);
		const room = await this.groupChatRepository.findOneBy({ RoomName: roomName });
		const chatUser = await this.groupChatUsersRepository.findOneBy({ users: user, GroupChat:room });
		await this.groupChatMessagesRepository.delete({ GroupChat: room, User: chatUser });
		await this.groupChatUsersRepository.delete({GroupChat:room, users:user});
	}

	async leave(userName:string, roomName:string){
		const user = await this.userService.getUserByLogin(userName);
		const room = await this.groupChatRepository.findOneBy({ RoomName: roomName });
		const chatUser = await this.groupChatUsersRepository.findOneBy({ users: user, GroupChat:room });
		await this.groupChatMessagesRepository.delete({ GroupChat: room, User: chatUser });
		await this.groupChatUsersRepository.delete({GroupChat:room, users:user});

		const chatUserCount = (await this.groupChatUsersRepository.findAndCount({where:{GroupChat:room}}))[1];
		console.log(chatUserCount);
		if (chatUserCount === 0)
			await this.groupChatRepository.delete({RoomName:room.RoomName});
	 	if (chatUser.isAdmin && chatUserCount)
		{
			const newAdmin = (await this.groupChatUsersRepository.find({where:{GroupChat:room}})).at(0);
			await this.groupChatUsersRepository.save({...newAdmin, isAdmin:true});
		}
	}

	async setAdmin(username:string, roomname:string)
	{
		const user = await  this.userService.getUserByLogin(username);
		const room = await this.groupChatRepository.findOneBy({RoomName:roomname});
		const chatUser = await this.groupChatUsersRepository.findOneBy({GroupChat:room, users:user});
		await this.groupChatUsersRepository.save({
			...chatUser,
			isAdmin:true
		});
	}

}
