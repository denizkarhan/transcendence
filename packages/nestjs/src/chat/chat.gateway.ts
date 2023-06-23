import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { ChatService } from './service/chat/chat.service';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
    cors: {
      origin: '*',
    },
    namespace:'chat'
  })
export class ChatGateWay  implements OnGatewayConnection, OnGatewayDisconnect{
    
    nick:string;

    constructor(private chatService: ChatService) { }
    
    @WebSocketServer()
    server: Server;
    
    async handleDisconnect(socket: Socket) {
        // console.log(this.nick, " disconnect")
        socket.disconnect(true);
    }


    async handleConnection(socket: Socket) : Promise<boolean>{
        this.nick = socket.handshake.auth.nick.split("%22")[3];

        // console.log(this.nick, " connection");
        if(!this.nick)
        {
            socket.disconnect(true);
            return false;
        }
        return true;
    }

    @SubscribeMessage('getMessage')
    async getMessage(@MessageBody() room:any, @ConnectedSocket() socket:Socket){
        // console.log(room);
    }

}