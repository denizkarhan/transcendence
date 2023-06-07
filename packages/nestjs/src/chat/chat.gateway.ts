import { Controller, Get, OnModuleInit, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MessageBody, OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Request } from 'express';
import { Server, Socket } from 'socket.io';
import { AuthanticaterService } from 'src/auth/authanticater/service/authanticater/authanticater.service';
import { LocalAuthService } from 'src/auth/local-auth/local-auth.service';
import { UsersService } from 'src/users/service/users/users.service';
import { ChatService } from './chat.service';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection {
  
  constructor(private chatService: ChatService, private userService: UsersService, private authService: LocalAuthService, ) {}

  @WebSocketServer()
  server: Server;

  async handleConnection(client: Socket) {
    const sessionCookie = client.handshake.headers.cookie
    .split('; ')
    .find((cookie: string) => cookie
    .startsWith('session')).split('=')[1];

    console.log(sessionCookie);
  }

  // async handleConnection(client: Socket) {

  //   const user = await this.authService.getUserFromSocket(client);
  //   const chat = await this.chatService.chatRepository.findOneBy({ user: user});

  //   chat.socketid = client.id;
  //   this.chatService.chatRepository.save(chat);

  //   client.data.user = user;
  //   console.log(user);
  // }
  
  @SubscribeMessage('message')
  handleMessage(@MessageBody() body: any) {    
    console.log(body);
    this.server.emit('onMessage', body);
    this.server.to('socketid').emit(body);
  }
}
