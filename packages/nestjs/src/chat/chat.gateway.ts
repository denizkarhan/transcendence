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
export class ChatGateway implements OnGatewayConnection {
  
  constructor(private chatService: ChatService, private userService: UsersService, private authService: LocalAuthService, ) {}

  @WebSocketServer()
  server: Server;

  async handleConnection(client: Socket) {
    console.log('NICK ', client.handshake.headers.cookie.split("%22")[3]);
    console.log('CLIENTID ', client.id);
    console.log('SESSIONID', client.handshake.headers.cookie.split('=')[1].split(';')[0]);
    const nick = client.handshake.headers.cookie.split("%22")[3];
    const sessionID = client.handshake.headers.cookie.split('=')[1].split(';')[0];

    const newChatter = this.chatService.chatterRepository.create({
      socketid: client.id,
      user: (await this.userService.getUserByLogin(nick)),
    });
    this.chatService.chatterRepository.save(newChatter)
  }
  
  @SubscribeMessage('events')
  handleEvent(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
    ): string {
    return data;
  }
}
