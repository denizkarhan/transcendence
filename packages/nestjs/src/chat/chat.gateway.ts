import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { ChatService } from './service/chat/chat.service';
import { Server, Socket } from 'socket.io';
import { Roles } from 'src/utils/metadata';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';

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
		console.log(this.nick, " disconnect")
		socket.disconnect(true);
	}


	async handleConnection(socket: Socket): Promise<boolean> {
		this.nick = socket.handshake.auth.nick.split("%22")[3];
		const userRooms = await this.chatService.getRooms(this.nick);
		userRooms.forEach(room => {
			socket.join(room.GroupChat.RoomName);
		});
		console.log(this.nick, " connection");
		if (!this.nick) {
			socket.disconnect(true);
			return false;
		}
		return true;
	}

	@SubscribeMessage('createRoom')
	async createRoom(@MessageBody() room: any, @ConnectedSocket() socket: Socket) {
		if (room.RoomName[0] !== '#' )
		{
			socket.emit('ErrorHandle', { message: 'room name must start with #' });
			return;
		}
		if (await this.chatService.isExistRoom(room.RoomName))
		{
			socket.emit('ErrorHandle', { message: 'Is Exist Room' });
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
		socket.emit('createRoom', newRoomData);
	}

	@SubscribeMessage('changePassword')
	async changePassword(@MessageBody() room: any, @ConnectedSocket() socket: Socket) {
		await this.chatService.changeRoomPassword(room.roomName, room.password, room.username);
	}


	
	@SubscribeMessage('sendMessage')
	async sendMessage(@MessageBody() data: any, @ConnectedSocket() socket: Socket) {
		// console.log("send ", data);
		const response = await this.chatService.sendMessage(data.RoomName, data.UserName, data.Message);
		if (response) {
			socket.emit('receiveMessage', { Message: response, RoomName: data.RoomName });
			socket.to(data.RoomName).emit('receiveMessage', { Message: response, RoomName: data.RoomName });
		}
		else
			socket.emit('ErrorHandle', { message: 'you cant send messages' });
	}

	@SubscribeMessage('createPrivMessage')
	async sendPrivMessage(@MessageBody() data: any, @ConnectedSocket() socket: Socket) {
		const room = await this.chatService.getPrivateRoom(data.Sender, data.Receiver);
		// console.log(room);
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
					socket.emit('ErrorHandle', { message: response.message });
					return;
				}
			}
			socket.join(data.RoomName);
			socket.emit('isJoin', true);
			if (isJoin === false) {
				const newRoomData = await this.chatService.getRoom(data.RoomName);
				socket.emit('createRoom', newRoomData);
			}
		} else {
			socket.emit('ErrorHandle', { message: 'Channel Is Not Found' });
		}

	}


	@SubscribeMessage('getPublic')
	async getPublic(@ConnectedSocket() socket: Socket) {
		const response = await this.chatService.getPublic();

		socket.emit('getPublic', response);
	}
}