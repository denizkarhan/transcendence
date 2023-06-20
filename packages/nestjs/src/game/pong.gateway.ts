import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MatchHistoriesService } from 'src/match-histories/services/match-histories/match-histories.service';

const rooms = new Map<string, number[]>(); // (Kişi sayısı, User1 İd, User2 İd, Oyuna bağlananların sayısı, ScoreOne, ScoreTwo)
const connectedUsers = new Map<string, { id: number, socket: Socket, roomName: string }>();
let userCount = 0;
let nextUserId = 1;

const G = '\x1b[32m';
const RB = '\x1b[31;1m';
const R = '\x1b[0m';

@WebSocketGateway({ cors: '*' })
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

        //console.log("User", nick + G, "Connected" + R);
        userCount += 1;
        const userId = nextUserId++;
        const roomName = "NULL";
        connectedUsers.set(socket.id, { id: userId, socket: socket, roomName: roomName });
        connectedUsers.forEach(element => {
            const roomKeys = Array.from(rooms.keys());
            for (const key of roomKeys) {
                if (rooms.has(key) && rooms.get(key)![0] === 1) {
                    element.socket.emit('buttonUpdated', [key, 2]);
                } else if (rooms.get(key)![0] === 2) {
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
                console.log(RB + "User " + connectedUsers.get(key)!.id + " Disconnected!" + R);
                const roomName = connectedUsers.get(key)!.roomName;
                if (rooms.has(roomName) && rooms.get(roomName)![0] === 2) {
                    const pOne = rooms.get(roomName)![1];
                    const pTwo = rooms.get(roomName)![2];
                    const scoreOne = rooms.get(roomName)![4];
                    const scoreTwo = rooms.get(roomName)![5];

                    if (pOne === connectedUsers.get(key)!.id) {
                        rooms.set(roomName, [1, -1, pTwo, 0, scoreOne, scoreTwo]);
                    } else if (pTwo === connectedUsers.get(key)!.id) {
                        rooms.set(roomName, [1, pOne, -1, 0, scoreOne, scoreTwo]);
                    }
                    connectedUsers.forEach(element => {
                        element.socket.emit('buttonUpdated', [roomName, 2]);
                    });
                }
                else if (rooms.has(roomName) && rooms.get(roomName)![0] === 1) {
                    rooms.delete(roomName);
                    connectedUsers.forEach(element => {
                        element.socket.emit('buttonUpdated', [roomName, 1]);
                    });
                }
                userCount -= 1;
                connectedUsers.delete(key);
                socket.leave(roomName);
                if (userCount % 2 === 1)
                    socket.to(roomName).emit('userDisconnected', 1);
            }
        }
    }

    @SubscribeMessage('keydown')
        async keyDown(@MessageBody() game: any, @ConnectedSocket() socket: Socket) {
        if (game.flag % 2 === 1)
            return;
        if (connectedUsers.get(socket.id)!.roomName === "NULL") {
            console.log(RB + "Bir odada değilsiniz, lütfen bir odaya giriş yapınız." + R, socket.id);
            return;
        }
        const key = game.key;
        let playerOne = game.pOne;
        let playerTwo = game.pTwo;
        let balım = game.ball;
        
        const user = connectedUsers.get(socket.id);
        const room = connectedUsers.get(socket.id)!.roomName;

        let scoreOne = rooms.get(room)![4];
        let scoreTwo = rooms.get(room)![5];
        if (rooms.get(room)[0] === 2) {
            if (user!.id === rooms.get(room)![1]) {
                if (key === "w" && playerOne.y - playerOne.gravity > 0)
                    playerOne.y -= playerOne.gravity * 4;
                else if (key === "s" && playerOne.y + playerOne.height + playerOne.gravity < 500)
                    playerOne.y += playerOne.gravity * 4;
            }
            if (user!.id === rooms.get(room)![2]) {
                if (key === "w" && playerTwo.y - playerTwo.gravity > 0)
                    playerTwo.y -= playerTwo.gravity * 4;
                else if (key === "s" && playerTwo.y + playerTwo.height + playerTwo.gravity < 500)
                    playerTwo.y += playerTwo.gravity * 4;
            }

            connectedUsers.forEach(element => {
                if (rooms.get(room)![3] === 2)
                    element.socket.to(room).emit('countDown', []);
            });

            connectedUsers.forEach(element => {
                if (element.roomName === room && rooms.get(room)![3] < 2) { // Oyunculardan herhangi biri ilk tuşa basınca
                    let val = rooms.get(room);
                    val![3] += 1;
                    rooms.set(room, val!); // oyuna giren kullanıcı sayısını odada güncelliyorum
                    element.socket.to(room).emit('startGame', [game.pOne, game.pTwo, game.sOne, game.sTwo, balım]); // Hareketi room(x) odasındakilere gönder
                }
                else if (element.roomName === room) {
                    element.socket.to(room).emit('movePlayer', [playerOne, playerTwo, scoreOne, scoreTwo, balım]);
                }
            });
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
                setupRoom[4] = scoreOne;
                setupRoom[5] = scoreTwo;
                let winner = 0;
                if (scoreOne === 3) {
                    winner = setupRoom[1];
                } else if (scoreTwo === 3) {
                    winner = setupRoom[2];
                }
                rooms.set(room, setupRoom);
                connectedUsers.forEach(element => {
                    if (element.roomName === room) {
                        if (scoreOne === 3 || scoreTwo === 3) {
                            element.socket.to(element.roomName).emit('gameOver', winner);
                        }
                    }
                });
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

        if (roomName.roomName === "HEMEN OYNA") {
            user.roomName = availableRoom(user.id, 0);
            if (rooms.get(user.roomName)?.[0] === 2) {
                color = 0;
            } else if (rooms.get(user.roomName)?.[0] === 1) {
                color = 2;
            }
            connectedUsers.set(socket.id, user);
        } else if (rooms.has(roomName.roomName) && rooms.get(roomName.roomName)?.[0] === 0) {
            // Boş oda
            user.roomName = roomName.roomName;
            rooms.set(roomName.roomName, [1, user.id, -1, 0, 0, 0]);
            color = 2;
            connectedUsers.set(socket.id, user);
        } else if (rooms.has(roomName.roomName) && rooms.get(roomName.roomName)?.[0] === 1) {
            // Odada 1 kişi var
            user.roomName = roomName.roomName;
            const one = rooms.get(roomName.roomName)?.[1];
            const two = rooms.get(roomName.roomName)?.[2];
            if (one === -1) {
                rooms.set(roomName.roomName, [2, user.id, two!, 0, 0, 0]);
            } else if (two === -1) {
                rooms.set(roomName.roomName, [2, one!, user.id, 0, 0, 0]);
            }
            color = 0;
            connectedUsers.set(socket.id, user);
        } else if (rooms.has(roomName.roomName) && rooms.get(roomName.roomName)?.[0] === 2) {
            // Oda dolu
            //console.log(RB + "Oda dolu!" + R);
            return;
        } else if (!rooms.has(roomName.roomName)) {
            user.roomName = roomName.roomName;
            rooms.set(roomName.roomName, [1, user.id, -1, 0, 0]);
            color = 2;
            connectedUsers.set(socket.id, user);
        }

        socket.join(user.roomName);
        connectedUsers.forEach(element => {
            element.socket.emit('buttonUpdated', [user.roomName, color]);
            if (element.roomName === roomName.roomName && rooms.get(user.roomName)?.[0] === 2) {
                element.socket.emit('userRegister', [element.id]);
            }
        });
    }
}

function availableRoom(userId: number, i: number): string {
    while (i++ < rooms.size) {
        const rName = "ROOM" + i.toString();
        if (rooms.get(rName)![0] < 2) {
            const countUser = rooms.get(rName)![0];
            if (countUser === 0) {
                rooms.set(rName, [1, userId, -1, 0, 0, 0]);
            } else if (countUser === 1) {
                const one = rooms.get(rName)![1];
                const two = rooms.get(rName)![2];
                if (one === -1) {
                    rooms.set(rName, [2, userId, two, 0, 0, 0]);
                } else if (two === -1) {
                    rooms.set(rName, [2, one, userId, 0, 0, 0]);
                }
            }
            return rName;
        }
    }

    const rName = "ROOM" + (rooms.size + 1).toString();
    rooms.set(rName, [1, userId, -1, 0, 0, 0]);
    return rName;
}
