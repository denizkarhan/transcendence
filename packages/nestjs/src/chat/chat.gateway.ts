import { Controller, Get, OnModuleInit, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MessageBody, OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import cookieParser from 'cookie-parser';
import { Request } from 'express';
import { authenticate } from 'passport';
import { Server, Socket } from 'socket.io';
import { AuthanticaterService } from 'src/auth/authanticater/service/authanticater/authanticater.service';
import { LocalAuthService } from 'src/auth/local-auth/local-auth.service';
import { JwtAuthGuard } from 'src/auth/utils/jwt-auth.guard';
import { UsersService } from 'src/users/service/users/users.service';
import { ChatService } from './chat.service';

@WebSocketGateway( {cors: true} )
export class ChatGateway implements OnGatewayConnection {
  
  constructor(private chatService: ChatService, private userService: UsersService, private authService: LocalAuthService, ) {}

  @WebSocketServer()
  server: Server;

  @UseGuards(JwtAuthGuard)
  async handleConnection(client: Socket) {
    
    console.log('NICK ', client.handshake.headers.authorization.split('%22')[3]);
    console.log('CLIENTID ', client.id);
    console.log('SESSIONID', client.handshake.headers.sessionID);

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
