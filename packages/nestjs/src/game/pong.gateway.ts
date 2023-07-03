import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MatchHistoriesService } from 'src/match-histories/services/match-histories/match-histories.service';

const userSocket = new Map<string, {socket: Socket}>();
const rooms = new Map<string, { count: number, user1: string | null, user2: string | null, connectionCount: number, scoreOne: number, scoreTwo: number }>(); // (Kişi sayısı, User1 İd, User2 İd, Oyuna bağlananların sayısı, ScoreOne, ScoreTwo)
const connectedUsers = new Map<string, { username: string, socket: Socket, roomName: string }>();
let nextUserId = 1;

const G = '\x1b[32m';
const RB = '\x1b[31;1m';
const R = '\x1b[0m';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
    namespace: 'game'
})
export class PongGateway implements OnGatewayConnection, OnGatewayDisconnect {
    constructor(private matchService: MatchHistoriesService) { }

    @WebSocketServer()
    server: Server;

    async handleConnection(socket: Socket): Promise<boolean> {
        const nick = socket.handshake.auth.nick.split("%22")[3];
        const token = socket.handshake.auth.token;

        if (!nick || !token) {
            socket.disconnect(true);
            return false;
        }

        const userId = nextUserId++;
        const roomName = "NULL";
        userSocket.set(nick, {socket: socket});
        connectedUsers.set(socket.id, { username: nick, socket: socket, roomName: roomName });
        connectedUsers.forEach(element => {
            const roomKeys = Array.from(rooms.keys());
            for (const key of roomKeys) {
                if (rooms.has(key) && rooms.get(key)!.count === 1) {
                    element.socket.emit('buttonUpdated', [key, 2]);
                } else if (rooms.get(key)!.count === 2) {
                    element.socket.emit('buttonUpdated', [key, 0]);
                }
            }
        });

        return true;
    }

    async handleDisconnect(socket: Socket) {
        const usersKeys = Array.from(connectedUsers.keys());
        for (const key of usersKeys) {
            if (connectedUsers.has(key) && socket!.id === connectedUsers.get(key)!.socket.id) {
                // console.log(RB + "User " + connectedUsers.get(key)!.username + " Disconnected!" + R);
                const roomName = connectedUsers.get(key)!.roomName;
                const nickName = connectedUsers.get(key)!.username;
                if (rooms.has(roomName) && rooms.get(roomName)!.count === 2) {
                    const pOne = rooms.get(roomName)!.user1;
                    const pTwo = rooms.get(roomName)!.user2;
                    const scoreOne = rooms.get(roomName)!.scoreOne;
                    const scoreTwo = rooms.get(roomName)!.scoreTwo;

                    if (pOne === connectedUsers.get(key)!.username) {
                        rooms.set(roomName, { count: 1, user1: null, user2: pTwo, connectionCount: 0, scoreOne: scoreOne, scoreTwo: scoreTwo });
                        userSocket.get(pTwo).socket.emit('userDisconnected', 1);
                    } else if (pTwo === connectedUsers.get(key)!.username) {
                        rooms.set(roomName, { count: 1, user1: pOne, user2: null, connectionCount: 0, scoreOne: scoreOne, scoreTwo: scoreTwo });
                        userSocket.get(pOne).socket.emit('userDisconnected', 1);
                    }
                    connectedUsers.forEach(element => {
                        element.socket.emit('buttonUpdated', [roomName, 2]);
                    });
                }
                else if (rooms.has(roomName) && rooms.get(roomName)!.count === 1) {
                    rooms.delete(roomName);
                    connectedUsers.forEach(element => {
                        element.socket.emit('buttonUpdated', [roomName, 1]);
                    });
                }
                connectedUsers.delete(key);
                userSocket.delete(nickName);
                socket.leave(roomName);
            }
        }
    }

    @SubscribeMessage('keydown')
    async keyDown(@MessageBody() data: any, @ConnectedSocket() socket: Socket) {
        if (connectedUsers.get(socket.id)!.roomName === "NULL") {
            console.log(RB + "Bir odada değilsiniz, lütfen bir odaya giriş yapınız." + R, socket.id);
            return;
        }

        const vars = data.split('*');
        const key = vars[0];
        let playerOneY = parseInt(vars[1]);
        let playerTwoY = parseInt(vars[2]);
        let gravity = parseInt(vars[3]);
        const user = connectedUsers.get(socket.id);
        const room = connectedUsers.get(socket.id)!.roomName;

        if (rooms.get(room).count === 2) {
            if (user!.username === rooms.get(room)!.user1) {
                if (key === "w" && playerOneY - gravity > 0)
                    playerOneY -= gravity * 4;
                else if (key === "s" && playerOneY + 80 + gravity < 400)
                    playerOneY += gravity * 4;
            }
            else if (user!.username === rooms.get(room)!.user2) {
                if (key === "w" && playerTwoY - gravity > 0)
                    playerTwoY -= gravity * 4;
                else if (key === "s" && playerTwoY + 80 + gravity < 400)
                    playerTwoY += gravity * 4;
            }

            let gameRoom = rooms.get(room);
            let userOne = rooms.get(room).user1;
            let userTwo = rooms.get(room).user2;

            if (rooms.get(room)!.connectionCount === 0) {
                gameRoom!.connectionCount = 2;
                rooms.set(room, gameRoom!);
                userSocket.get(userOne).socket.emit('startGame', []);
                userSocket.get(userTwo).socket.emit('startGame', []);

                userSocket.get(userOne).socket.emit('countDown', []);
                userSocket.get(userTwo).socket.emit('countDown', []);
            }
            else if (gameRoom!.connectionCount === 2) {
                userSocket.get(userOne).socket.to(room).emit('movePlayer', playerOneY.toString() + '*' + playerTwoY.toString() + '*' + vars[4] + '*' + vars[5] + '*' + vars[6] + '*' + vars[7]);
                userSocket.get(userTwo).socket.to(room).emit('movePlayer', playerOneY.toString() + '*' + playerTwoY.toString() + '*' + vars[4] + '*' + vars[5] + '*' + vars[6] + '*' + vars[7]);
            }
        }
        else {
            console.log(RB + "Odada 2 kişi olmalı" + R);
        }
    }

    @SubscribeMessage('scoreUpdate')
    async handleScoreUpdate(@MessageBody() scores: any, @ConnectedSocket() socket: Socket) {
        const scoreOne = scores.sOne;
        const scoreTwo = scores.sTwo;
        const room = connectedUsers.get(socket.id)?.roomName;
        
        if (room) {
            const setupRoom = rooms.get(room);
            if (setupRoom) {
                setupRoom.scoreOne = scoreOne;
                setupRoom.scoreTwo = scoreTwo;
                rooms.set(room, setupRoom);
                
                let winner = scoreOne === 3 ? setupRoom.user1 : scoreTwo === 3 ? setupRoom.user2 : null;

                if (scoreOne === 3 || scoreTwo === 3) {
                    userSocket.get(rooms.get(room).user1).socket.emit('gameOver', {winner: winner});
                    userSocket.get(rooms.get(room).user2).socket.emit('gameOver', {winner: winner});

                    this.matchService.addMatch({
                        EnemyResult: scoreTwo,
                        MyResult: scoreOne,
                        EnemyUserName: setupRoom.user2,
                    }, setupRoom.user1);
                    this.matchService.addMatch({
                        EnemyResult: scoreOne,
                        MyResult: scoreTwo,
                        EnemyUserName: setupRoom.user1,
                    }, setupRoom.user2);
                }
            }
        }
    }

    @SubscribeMessage('enterRoom')
    async handleRoom(@MessageBody() roomName: any, @ConnectedSocket() socket: Socket) {
        const user = connectedUsers.get(socket.id);
        let color = 1;

        if (user?.roomName !== "NULL") {
            return; // Zaten bir odası var
        }

        if (rooms.has(roomName.roomName) && (rooms.get(roomName.roomName).user1 === user.username)) {
            let userOne = rooms!.get(roomName.roomName)!.user1;
            userSocket.get(userOne).socket.emit('viewMods', {flag: 1});
            return;
        } else if (rooms.has(roomName.roomName) && (rooms.get(roomName.roomName).user2 === user.username)) {
            let userTwo = rooms!.get(roomName.roomName)!.user1;
            userSocket.get(userTwo).socket.emit('viewMods', {flag: 0});
            return;
        }

        if (roomName.roomName === "HEMEN OYNA") {
            user.roomName = availableRoom(user.username, 0);
            if (rooms.get(user.roomName)?.count === 2) {
                color = 0;
            } else if (rooms.get(user.roomName)?.count === 1) {
                color = 2;
            }
            connectedUsers.set(socket.id, user);
        } else if (rooms.has(roomName.roomName) && rooms.get(roomName.roomName)?.count === 0) {
            // Boş oda
            user.roomName = roomName.roomName;
            rooms.set(roomName.roomName, { count: 1, user1: user.username, user2: null, connectionCount: 0, scoreOne: 0, scoreTwo: 0 });
            color = 2;
            connectedUsers.set(socket.id, user);
        } else if (rooms.has(roomName.roomName) && rooms.get(roomName.roomName)?.count === 1) {
            // Odada 1 kişi var
            user.roomName = roomName.roomName;
            const one = rooms.get(roomName.roomName)?.user1;
            const two = rooms.get(roomName.roomName)?.user2;
            if (one === null) {
                rooms.set(roomName.roomName, { count: 2, user1: user.username, user2: two, connectionCount: 0, scoreOne: 0, scoreTwo: 0 });
            } else if (two === null) {
                rooms.set(roomName.roomName, { count: 2, user1: one, user2: user.username, connectionCount: 0, scoreOne: 0, scoreTwo: 0 });
            }
            color = 0;
            connectedUsers.set(socket.id, user);
        } else if (rooms.has(roomName.roomName) && rooms.get(roomName.roomName)?.count === 2) {
            // Oda dolu
            // console.log(RB + "Oda dolu!" + R);
            return;
        } else if (!rooms.has(roomName.roomName)) {
            user.roomName = roomName.roomName;
            rooms.set(roomName.roomName, { count: 1, user1: user.username, user2: null, connectionCount: 1, scoreOne: 0, scoreTwo: 0});
            color = 2;
            connectedUsers.set(socket.id, user);
        }

        socket.join(user.roomName);
        connectedUsers.forEach(element => {
            element.socket.emit('buttonUpdated', [user.roomName, color]);
            if (element.roomName === user.roomName && rooms.get(user.roomName)?.count === 2) {
                element.socket.emit('userRegister', [element.username, element.roomName]);
            }
        });

        let gameRoom = user.roomName;
        let userOne = rooms!.get(gameRoom)!.user1;
        let userTwo = rooms!.get(gameRoom)!.user2;

        if (rooms.get(gameRoom)!.count === 1) {
            userSocket.get(userOne).socket.emit('viewMods', {flag: 0});
        } else if (rooms.get(gameRoom)!.count === 2) {
            userSocket.get(userOne).socket.emit('viewMods', {flag: 1});
            userSocket.get(userTwo).socket.emit('viewMods', {flag: 0});

            userSocket.get(userOne).socket.emit('viewVS', {user1: rooms.get(gameRoom).user1, user2: rooms.get(gameRoom).user2});
            userSocket.get(userTwo).socket.emit('viewVS', {user1: rooms.get(gameRoom).user1, user2: rooms.get(gameRoom).user2});
        }
    }

    @SubscribeMessage('gameMod')
    async gameMod(@MessageBody() modes: any, @ConnectedSocket() socket: Socket) {
        let gameRoom = connectedUsers.get(socket.id).roomName;
        let userOne = rooms!.get(gameRoom)!.user1;
        let userTwo = rooms!.get(gameRoom)!.user2;

        if (rooms.get(gameRoom).count === 2 && modes.mod === 'f') {
            userSocket.get(userOne).socket.emit('setMod', {});
            userSocket.get(userTwo).socket.emit('setMod', {});
        }
    }
}

function availableRoom(username: string, i: number): string {
    while (i++ < rooms.size) {
        const rName = "ROOM" + i.toString();
        if (rooms.get(rName)!.count < 2) {
            const countUser = rooms.get(rName)!.count;
            if (countUser === 0) {
                rooms.set(rName, { count: 1, user1: username, user2: null, connectionCount: 0, scoreOne: 0, scoreTwo: 0 });
            } else if (countUser === 1) {
                const one = rooms.get(rName)!.user1;
                const two = rooms.get(rName)!.user2;
                if (one === null) {
                    rooms.set(rName, { count: 2, user1: username, user2: two, connectionCount: 0, scoreOne: 0, scoreTwo: 0 });
                } else if (two === null) {
                    rooms.set(rName, { count: 2, user1: one, user2: username, connectionCount: 0, scoreOne: 0, scoreTwo: 0 });
                }
            }
            return rName;
        }
    }

    const rName = "ROOM" + (rooms.size + 1).toString();
    rooms.set(rName, { count: 1, user1: username, user2: null, connectionCount: 0, scoreOne: 0, scoreTwo: 0 });
    return rName;
}
