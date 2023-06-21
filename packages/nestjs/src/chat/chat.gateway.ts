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

		console.log(this.nick, " connection");
		if (!this.nick) {
			socket.disconnect(true);
			return false;
		}
		return true;
	}

	@SubscribeMessage('createRoom')
	async createRoom(@MessageBody() room: any, @ConnectedSocket() socket: Socket) {
		await this.chatService.createRoom({
			RoomName: room.roomName,
			Admin: room.userName,
			IsPublic: room.isPublic,
			Password: room.password
		})
		socket.join(room.roomName);
	}

	@SubscribeMessage('changePassword')
	async changePassword(@MessageBody() room: any, @ConnectedSocket() socket: Socket) {
		await this.chatService.changeRoomPassword(room.roomName, room.password, room.username);
	}

	@SubscribeMessage('sendMessage')
	async sendMessage(@MessageBody() data: any, @ConnectedSocket() socket: Socket) {
		const response = await this.chatService.sendMessage(data.roomName, data.username, data.message);
		if (response.status === 200)
			socket.to(data.roomName).emit('sendMessage', data);
	}

	@SubscribeMessage('sendPrivMessage')
	async sendPrivMessage(@MessageBody() data: any, @ConnectedSocket() socket: Socket) {
		const room = await this.chatService.createRoom({
			RoomName:UUID.toString(),
			Admin:data.sender,
			IsPublic:true,
			Password:null
		})
		const response = await this.chatService.privateMessage(room.RoomName, data.sender, data.receiver, data.message);
		socket.to(room.RoomName).emit('sendPrivMessage', data);

	}

	@SubscribeMessage('getData')
	async getData(@MessageBody() data: any, @ConnectedSocket() socket: Socket) {
		console.log("data ", data);
		const response = await this.chatService.getMessage(data.userName);
		socket.emit('getData', response);
	}

	@SubscribeMessage('join')
	async join(@MessageBody() data: any, @ConnectedSocket() socket: Socket) {

		if (await this.chatService.isExistRoom(data.roomName)) {
			await this.chatService.joinRoom(data.roomName, data.userName);
			socket.join(data.roomName);
		}
	}
}