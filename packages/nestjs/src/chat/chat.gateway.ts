import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { ChatService } from './service/chat/chat.service';
import { Server, Socket } from 'socket.io';

let sockets = new Map<string, { socket: Socket }>();

@WebSocketGateway({
	cors: {
		origin: '*',
	},
	namespace: 'chat'
})
export class ChatGateWay implements OnGatewayConnection, OnGatewayDisconnect {

	nick: string;

	constructor(private chatService: ChatService) { }

	@WebSocketServer()
	server: Server;

	async handleDisconnect(socket: Socket) {
		console.log(this.nick, " disconnect");
		const userRooms = await this.chatService.getRooms(this.nick);
		userRooms.forEach(room => {
			socket.leave(room.GroupChat.RoomName);
		});
		socket.disconnect(true);
		// sockets.delete(this.nick);
	}


	async handleConnection(socket: Socket): Promise<boolean> {
		this.nick = socket.handshake.auth.nick.split("%22")[3];
		if (!this.nick) {
			socket.disconnect(true);
			return false;
		}
		const userRooms = await this.chatService.getRooms(this.nick);
		sockets.set(this.nick, { socket });
		if (userRooms.length) {
			userRooms.forEach(room => {
				socket.join(room.GroupChat.RoomName);
			});
		}
		
		console.log(this.nick, " connection");
		return true;
	}

	@SubscribeMessage('createRoom')
	async createRoom(@MessageBody() room: any, @ConnectedSocket() socket: Socket) {
		if (await this.chatService.isExistRoom(room.RoomName)) {
			socket.volatile.emit('ErrorHandle', { message: 'Is Exist Room' });
			return;
		}
		await this.chatService.createRoom({
			RoomName: room.RoomName,
			Admin: room.Admin,
			IsPublic: room?.IsPublic,
			Password: room.Password
		})
		const newRoomData = await this.chatService.getRoom(room.RoomName);
		socket.join(room.RoomName);
		if (newRoomData.IsPublic)
			socket.broadcast.emit('getPublicAddOne', newRoomData);
		socket.emit('createRoom', newRoomData);
	}

	@SubscribeMessage('updateRoom')
	async changePassword(@MessageBody() room: any, @ConnectedSocket() socket: Socket) {
		if (room?.RoomName && await this.chatService.isExistRoom(room.RoomName)) {
			socket.volatile.emit('ErrorHandle', { message: 'Is Exist Room' });
			return;
		}
		const response = await this.chatService.updateRoom({ RoomName: room?.RoomName, Password: room?.Password, IsPublic: room?.IsPublic }, room.Admin, room.OldRoomName);
		if (response.status === 200) {
			const newRoomData = await this.chatService.getRoom(room.RoomName);
			socket.emit("updateRoom", { OldRoomName: room.OldRoomName, ...newRoomData });
			socket.broadcast.emit("updatePublic", { OldRoomName: room.OldRoomName, ...newRoomData });
			socket.to(newRoomData.RoomName).emit("updateRoom", { OldRoomName: room.OldRoomName, ...newRoomData });
		}
		else
			socket.volatile.emit('ErrorHandle', { message: 'Some thing is wrong' });

	}


	@SubscribeMessage('sendMessage')
	async sendMessage(@MessageBody() data: any, @ConnectedSocket() socket: Socket) {
		let response;
		if (data.RoomName[0] !== '#') {
			console.log(sockets);
			response = await this.chatService.privateMessage(data.RoomName, data.UserName, data.Message);
			if (response) {
				if (sockets.has(response?.receiver.Login))
					sockets.get(response?.receiver.Login).socket.emit('receiveMessage', { Message: response?.send, RoomName: data.RoomName });
				socket.emit('receiveMessage', { Message: response.send, RoomName: data.RoomName });
				return;
			}
		}
		else
			response = await this.chatService.sendMessage(data.RoomName, data.UserName, data.Message);
		if (response) {
			socket.emit('receiveMessage', { Message: response, RoomName: data.RoomName });
			socket.to(data.RoomName).emit('receiveMessage', { Message: response, RoomName: data.RoomName });
		}
		else
			socket.volatile.emit('ErrorHandle', { message: 'you cant send messages' });
	}

	@SubscribeMessage('createPrivMessage')
	async sendPrivMessage(@MessageBody() data: any, @ConnectedSocket() socket: Socket) {
		const room = await this.chatService.getPrivateRoom(data.Sender, data.Receiver);
		if (!room) {
			socket.volatile.emit('ErrorHandle', { message: 'User Not Found' });
			return;
		}
		if (!(await this.chatService.isJoin(room.RoomName, data.Receiver)))
			await this.chatService.joinRoom(room.RoomName, data.Receiver, null);
		socket.join(room.RoomName);
		const newRoomData = await this.chatService.getRoom(room.RoomName);
		socket.emit('createRoom', newRoomData);
	}

	@SubscribeMessage('getData')
	async getData(@MessageBody() data: any, @ConnectedSocket() socket: Socket) {
		// console.log("data ", data);
		const response = await this.chatService.getMessage(data.userName);
		socket.emit('getData', response);
	}

	@SubscribeMessage('join')
	async join(@MessageBody() data: any, @ConnectedSocket() socket: Socket) {
		// console.log(data);
		if (await this.chatService.isExistRoom(data.RoomName)) {

			const isJoin = await this.chatService.isJoin(data.RoomName, data.UserName);
			if (isJoin === false) {
				const response = await this.chatService.joinRoom(data.RoomName, data.UserName, data.Password);
				if (response.status === 403) {
					socket.volatile.emit('ErrorHandle', { message: response.message });
					return;
				}
				socket.join(data.RoomName);
				const roomData = await this.chatService.getRoom(data.RoomName);
				socket.emit('updateRoom', { OldRoomName: roomData.RoomName, ...roomData });
				socket.to(data.RoomName).emit('updateRoom', { OldRoomName: roomData.RoomName, ...roomData });
			}
		} else {
			socket.volatile.emit('ErrorHandle', { message: 'Channel Is Not Found' });
		}

	}

	@SubscribeMessage('getPublic')
	async getPublic(@ConnectedSocket() socket: Socket) {
		const response = await this.chatService.getPublic();

		socket.emit('getPublic', response);
	}

	@SubscribeMessage('deleteRoom')
	async deleteRoom(@MessageBody() data: any, @ConnectedSocket() socket: Socket) {
		const deleted = await this.chatService.getRoom(data.RoomName);
		await this.chatService.deleteRoom(data.RoomName);
		if (deleted.IsPublic)
			socket.broadcast.emit('deleteRoom', deleted);
		else
			socket.to(data.RoomName).emit('deleteRoom', deleted);
		socket.emit('deleteRoom', deleted);
	}

	@SubscribeMessage('kick')
	async kickRoom(@MessageBody() data: any, @ConnectedSocket() socket: Socket) {

		await this.chatService.kickUser(data.UserName, data.RoomName);
		const room = await this.chatService.getRoom(data.RoomName);
		if (sockets.has(data.UserName))
			sockets.get(data.UserName).socket.leave(room.RoomName);
		socket.emit("updateRoom", { OldRoomName: room.RoomName, KickUser: data.UserName, ...room });
		socket.to(data.RoomName).emit("updateRoom", { OldRoomName: room.RoomName, KickUser: data.UserName, ...room });
	}

	@SubscribeMessage('mute')
	async mute(@MessageBody() data: any, @ConnectedSocket() socket: Socket) {
		await this.chatService.mutedUser(data.UserName, data.RoomName);
		socket.emit('success', { Message: 'User is Muted ' + data.UserName });
	}


	@SubscribeMessage('unmute')
	async unMute(@MessageBody() data: any, @ConnectedSocket() socket: Socket) {
		await this.chatService.mutedUser(data.UserName, data.RoomName);
		socket.emit('success', { Message: 'User is UnMuted ' + data.UserName });
	}

	@SubscribeMessage('inviteGame')
	async inviteGame(@MessageBody() data: any, @ConnectedSocket() socket: Socket) {
		console.log(data);
		if (sockets.has(data.Invited))
			sockets.get(data.Invited).socket.emit('invite', data);
		else
			socket.volatile.emit('ErrorHandle', { message: 'Some thing is wrong' });
	}

	@SubscribeMessage('acceptInvite')
	async acceptInvite(@MessageBody() data: any, @ConnectedSocket() socket: Socket) {
		if (sockets.has(data.UserName))
			sockets.get(data.UserName).socket.emit('acceptInvite', { RoomName: data.RoomName });
		else
			socket.volatile.emit('ErrorHandle', { message: 'Some thing is wrong' });
		// await this.chatService.mutedUser(data.UserName, data.RoomName);
		// socket.emit('success', { Message: 'User is UnMuted ' + data.UserName });
	}

	@SubscribeMessage('leave')
	async leave(@MessageBody() data: any, @ConnectedSocket() socket: Socket) {
		const room = await this.chatService.getRoom(data.RoomName);
		await this.chatService.leave(data.UserName, data.RoomName);
		socket.leave(data.RoomName);
		if (room.Users.length === 1) {
			if (room.IsPublic)
				socket.broadcast.emit('deleteRoom', room);
			else
				socket.to(data.RoomName).emit('deleteRoom', room);
			socket.emit('deleteRoom', room);
		}
		socket.emit("updateRoom", { OldRoomName: room.RoomName, KickUser: data.UserName, ...room });
		socket.to(data.RoomName).emit("updateRoom", { OldRoomName: room.RoomName, KickUser: data.UserName, ...room });
	}
}
