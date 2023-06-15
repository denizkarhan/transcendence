import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { LocalAuthService } from 'src/auth/local-auth/local-auth.service';
import { UsersService } from 'src/users/service/users/users.service';
import { ChatService } from './chat.service';
``
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

  constructor(private chatService: ChatService, private userService: UsersService) { }

  @WebSocketServer()
  server: Server;

  async handleConnection(client: Socket): Promise<Boolean> {
    const nick = client.handshake.auth.nick.split("%22")[3];
    const token = client.handshake.auth.token;

    if (!nick || !token) {
      client.disconnect(true);
      return false;
    } else {
      console.log(`Client ${client.id} connected. Nickname: ${nick}, Auth token: ${token}`);
      return true;
    }
  }

  async handleDisconnect(client: Socket) {
    console.log(`Client ${client.id} disconnected`);
  }

  @SubscribeMessage('join')
  async handleJoin(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
    ): Promise<string> {
      const oldSize = client.rooms.size;
      console.log(this.chatService.checkPass(data?.name, data?.pass));
      if (await this.chatService.checkPass(data?.name, data?.pass)) {
        client.join(data?.name);
        if (client.rooms.size > oldSize)
          return "Join Success";
        else
          return "Join Fail";
      }
      else
        return "Wrong Pass";
  }

  @SubscribeMessage('leave')
  handleLeave(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
    ): string {
      const oldSize = client.rooms.size;
      client.leave(data?.name);
      if (client.rooms.size < oldSize)
        return "Leave Success";
      else
        return "Leave Fail";
    }

  @SubscribeMessage('create')
  async handleCreate(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
    ): Promise<string> {
      if (await this.chatService.createRoom(data)) {
        const oldSize = client.rooms.size;
        client.join(data?.roomName);
        if (client.rooms.size > oldSize)
          return "Create Success";
        else
          return "Create Fail";
      }
      else
        return "Channel name already in use";
    }
  
  @SubscribeMessage('toROOM')
  handletoROOM(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
    ): string {
      if (client.in(data?.name).emit("MSG", data?.msg))
        return "Msg Success";
      else
        return "MSG Fail";
  }

  @SubscribeMessage('changePass')
  handleChange(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ): string {
    const username = client.handshake.auth.nick.split("%22")[3];
    if (!this.chatService.findChannel(data?.channel))
      return "Channel Doesn't Exist";
    if (!this.chatService.checkAuth(data?.channel, username))
      return "Authorization Fail";
    else {
      this.chatService.updatePass(data?.channel, data?.newpass)
    }
  }

  @SubscribeMessage('MSG')
  handleMSG(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
    ): string {
      return data;
    }
}