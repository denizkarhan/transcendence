import { Controller, Get, OnModuleInit, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import cookieParser from 'cookie-parser';
import { Request } from 'express';
import { authenticate } from 'passport';
import { Server, Socket } from 'socket.io';
import { AuthanticaterService } from 'src/auth/authanticater/service/authanticater/authanticater.service';
import { LocalAuthService } from 'src/auth/local-auth/local-auth.service';
import { JwtAuthGuard } from 'src/auth/utils/jwt-auth.guard';
import { Chatter } from 'src/typeorm/entities/chat';
import { UsersService } from 'src/users/service/users/users.service';
import { ChatService } from './chat.service';
``
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

  constructor(private chatService: ChatService, private userService: UsersService, private authService: LocalAuthService,) { }

  @WebSocketServer()
  server: Server;

  async handleConnection(client: Socket) {
    const nick = client.handshake.auth.nick.split("%22")[3];
    const token = client.handshake.auth.token;

    if (!nick || !token) {
      client.disconnect(true);
    } else {
      console.log(`Client ${client.id} connected. Nickname: ${nick}, Auth token: ${token}`);
    }
  }

  async handleDisconnect(client: Socket) {
    console.log(`Client ${client.id} disconnected`);
  }

  @SubscribeMessage('join')
  handleJoin(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
    ): string {
      const oldSize = client.rooms.size;
      client.join(data?.name);
      if (client.rooms.size > oldSize)
        return "Join Success";
      else
        return "Join Fail"
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

  @SubscribeMessage('toROOM')
  handletoROOM(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
    ): string {
      if (client.to(data?.name).emit("MSG", data?.msg))
        return "Msg Success";
      else
        return "MSG Fail";
  }

  @SubscribeMessage('MSG')
  handleMSG(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
    ): string {
      return data;
    }
}