import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MatchHistoriesService } from 'src/match-histories/services/match-histories/match-histories.service';

const rooms = new Map<string, number[]>();
const connectedUsers = new Map<string, { id: number, socket: Socket, roomName: string }>();
let userCount = 0;
let nextUserId = 1;

const G = '\x1b[32m';
const RB = '\x1b[31;1m';
const R = '\x1b[0m';

console.log("Server açıldı")

@WebSocketGateway({ cors: '*' })
export class PongGateway implements OnGatewayConnection, OnGatewayDisconnect {
    constructor(private matchService: MatchHistoriesService) { }

    @WebSocketServer()
    server: Server;

    async handleConnection(socket: Socket): Promise<boolean> {
        console.log("handleConnection");

        // const nick = socket.handshake.auth && socket.handshake.auth.nick ? socket.handshake.auth.nick.split("%22")[3] : null;
        const nick = socket.handshake.auth.nick.split("%22")[3];
        const token = socket.handshake.auth.token;

        if (!nick || !token) {
            socket.disconnect(true);
            return false;
        }
        //socker id işi bozuyor onu userName yap;-------------------
        console.log(`Client ${socket.id} connected. Nickname: ${nick}, Auth token: ${token}`);
        console.log("User", nick + G, "Connected" + R);
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
        console.log("handleDisconnect");

        console.log(`Client ${socket.id} disconnected`);
        const usersKeys = Array.from(connectedUsers.keys());
        for (const key of usersKeys) {
            if (socket!.id === connectedUsers.get(key)!.socket.id) {
                console.log(RB + "User", connectedUsers.get(key)!.id + G, "Disconnected!" + R);
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
                console.log("User", connectedUsers.get(key)!.id, RB + "Disconnected" + R);
                connectedUsers.delete(key);
                socket.leave(roomName);
                if (userCount % 2 === 1)
                    socket.to(roomName).emit('userDisconnected', 1);
            }
        }
    }

    @SubscribeMessage('keydown')
        async keyDown(@MessageBody() game: any, @ConnectedSocket() socket: Socket) {
        if (connectedUsers.get(socket.id)!.roomName === "NULL") {
            console.log(RB + "Bir odada değilsiniz, lütfen bir odaya giriş yapınız." + R);
            return;
        }

        const key = game.key;
        console.log("------------------>", game);
        let playerOne = game.pOne;
        let playerTwo = game.pTwo;

        const user = connectedUsers.get(socket.id);
        const room = connectedUsers.get(socket.id)!.roomName;

        let scoreOne = rooms.get(room)![4];
        let scoreTwo = rooms.get(room)![5];
        // console.log("-----------------------> ",rooms.get(room));
        // console.log("-----------------------> ", user);
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
                if (element.roomName === room && rooms.get(room)![3] < 2) { // Oyunculardan herhangi biri ilk tuşa basınca
                    let val = rooms.get(room);
                    val![3] += 1;
                    rooms.set(room, val!); // oyuna giren kullanıcı sayısını odada güncelliyorum
                    element.socket.to(room).emit('startGame', [game.pOne, game.pTwo, game.sOne, game.sTwo, game.ball]); // Hareketi room(x) odasındakilere gönder
                }
                else if (element.roomName === room) {
                    element.socket.to(room).emit('movePlayer', [playerOne, playerTwo, scoreOne, scoreTwo, game.ball]);
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

        console.log(roomName);
        if (user?.roomName !== "NULL") {
            return; // Zaten bir odası var
        }

        if (roomName.roomName === "HEMEN OYNA") {
            // Rastgele boş bir odaya gir
            console.log("---------------------->",user.id);
            user.roomName = availableRoom(user.id, 0);
            console.log("user.roomName: ", user.roomName)
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
            console.log(RB + "Oda dolu!" + R);
            return;
        } else if (!rooms.has(roomName.roomName)) {
            user.roomName = roomName.roomName;
            rooms.set(roomName.roomName, [1, user.id, -1, 0, 0]);
            color = 2;
            connectedUsers.set(socket.id, user);
        }

        socket.join(user.roomName);
        console.log("Room name->", user.roomName);
        console.log("usercount->", rooms.get(user.roomName)?.[0]);
        connectedUsers.forEach(element => {
            element.socket.emit('buttonUpdated', [user.roomName, color]);
            if (element.roomName === roomName.roomName && rooms.get(user.roomName)?.[0] === 2) {
                element.socket.emit('userRegister', [element.id]);
            }
        });
    }
}

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server);

function availableRoom(userId: number, i: number): string {
    console.log("availableRoom")
    while (i++ < rooms.size) {
        const rName = "room" + i.toString();
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

    const rName = "room" + (rooms.size + 1).toString();
    rooms.set(rName, [1, userId, -1, 0, 0, 0]);
    return rName;
}

// io.on('connection', function (socket: Socket) {
//     userCount += 1;
//     const userId = nextUserId++;
//     const roomName = "NULL";
//     connectedUsers.set(socket.id, { id: userId, socket: socket, roomName: roomName });

//     console.log("User", userId + G, "Connected" + R);
//     connectedUsers.forEach(element => {
//         const roomKeys = Array.from(rooms.keys());
//         for (const key of roomKeys) {
//             if (rooms.has(key) && rooms.get(key)![0] === 1) {
//                 element.socket.emit('buttonUpdated', [key, 2]);
//             } else if (rooms.get(key)![0] === 2) {
//                 element.socket.emit('buttonUpdated', [key, 0]);
//             }
//         }
//     });

//     socket.on('disconnect', function () {
//         const usersKeys = Array.from(connectedUsers.keys());
//         for (const key of usersKeys) {
//             if (socket!.id === connectedUsers.get(key)!.socket.id) {
//                 console.log(RB + "User", connectedUsers.get(key)!.id + G, "Disconnected!" + R);
//                 const roomName = connectedUsers.get(key)!.roomName;
//                 if (rooms.has(roomName) && rooms.get(roomName)![0] === 2) {
//                     const pOne = rooms.get(roomName)![1];
//                     const pTwo = rooms.get(roomName)![2];
//                     const scoreOne = rooms.get(roomName)![4];
//                     const scoreTwo = rooms.get(roomName)![5];

//                     if (pOne === connectedUsers.get(key)!.id) {
//                         rooms.set(roomName, [1, -1, pTwo, 0, scoreOne, scoreTwo]);
//                     } else if (pTwo === connectedUsers.get(key)!.id) {
//                         rooms.set(roomName, [1, pOne, -1, 0, scoreOne, scoreTwo]);
//                     }
//                     connectedUsers.forEach(element => {
//                         element.socket.emit('buttonUpdated', [roomName, 2]);
//                     });
//                 }
//                 else if (rooms.has(roomName) && rooms.get(roomName)![0] === 1) {
//                     rooms.delete(roomName);
//                     connectedUsers.forEach(element => {
//                         element.socket.emit('buttonUpdated', [roomName, 1]);
//                     });
//                 }
//                 userCount -= 1;
//                 console.log("User", connectedUsers.get(key)!.id, RB + "Disconnected" + R);
//                 connectedUsers.delete(key);
//                 socket.leave(roomName);
//                 if (userCount % 2 == 1)
//                     socket.to(roomName).emit('userDisconnected', 1);
//             }
//         }
//     });

//     socket.on('keydown', function (key: string, data: any) {
//         // console.log(RB + G + connectedUsers.get(socket.id).roomName + R)
//         if (connectedUsers.get(socket.id)!.roomName == "NULL") {
//             console.log(RB + "Bir odada değilsiniz, lütfen bir odaya giriş yapınız." + R);
//             return;
//         }

//         let playerOne = data[0];
//         let playerTwo = data[1];
//         let ball = data[4];

//         const user = connectedUsers.get(socket.id);
//         const room = connectedUsers.get(socket.id)!.roomName;

//         let scoreOne = rooms.get(room)![4];
//         let scoreTwo = rooms.get(room)![5];

//         if (rooms.get(room)![0] == 2) {
//             if (user!.id == rooms.get(room)![1]) {
//                 if (key == "w" && playerOne.y - playerOne.gravity > 0)
//                     playerOne.y -= playerOne.gravity * 4;
//                 else if (key == "s" && playerOne.y + playerOne.height + playerOne.gravity < 500)
//                     playerOne.y += playerOne.gravity * 4;
//             }
//             if (user!.id == rooms.get(room)![2]) {
//                 if (key == "w" && playerTwo.y - playerTwo.gravity > 0)
//                     playerTwo.y -= playerTwo.gravity * 4;
//                 else if (key == "s" && playerTwo.y + playerTwo.height + playerTwo.gravity < 500)
//                     playerTwo.y += playerTwo.gravity * 4;
//             }

//             connectedUsers.forEach(element => {
//                 if (element.roomName == room && rooms.get(room)![3] < 2) { // Oyunculardan herhangi biri ilk tuşa basınca
//                     let val = rooms.get(room);
//                     val![3] += 1;
//                     rooms.set(room, val!); // oyuna giren kullanıcı sayısını odada güncelliyorum
//                     element.socket.to(room).emit('startGame', data); // Hareketi room(x) odasındakilere gönder
//                 }
//                 else if (element.roomName == room) {
//                     element.socket.to(room).emit('movePlayer', [playerOne, playerTwo, scoreOne, scoreTwo, ball]);
//                 }
//             });
//         }
//         else {
//             console.log(RB + "Odada 2 kişi olmalı" + R);
//         }
//     });

//     socket.on('scoreUpdate', function (scoreOne: number, scoreTwo: number) {
//         const room = connectedUsers.get(socket.id)?.roomName;
//         if (room) {
//             const setupRoom = rooms.get(room);
//             if (setupRoom) {
//                 setupRoom[4] = scoreOne;
//                 setupRoom[5] = scoreTwo;
//                 let winner = 0;
//                 if (scoreOne === 3) {
//                     winner = setupRoom[1];
//                 } else if (scoreTwo === 3) {
//                     winner = setupRoom[2];
//                 }
//                 rooms.set(room, setupRoom);
//                 connectedUsers.forEach(element => {
//                     if (element.roomName === room) {
//                         if (scoreOne === 3 || scoreTwo === 3) {
//                             element.socket.to(element.roomName).emit('gameOver', winner);
//                         }
//                     }
//                 });
//             }
//         }
//     });

//     socket.on('enterRoom', function (roomName: string) {
//         const user = connectedUsers.get(socket.id);
//         let color = 1;

//         if (user?.roomName !== "NULL") {
//             return; // Zaten bir odası var
//         }

//         if (roomName === "Hemen Oyna") {
//             // Rastgele boş bir odaya gir
//             user.roomName = availableRoom(user.id, 0);
//             if (rooms.get(user.roomName)?.[0] === 2) {
//                 color = 0;
//             } else if (rooms.get(user.roomName)?.[0] === 1) {
//                 color = 2;
//             }
//             connectedUsers.set(socket.id, user);
//         } else if (rooms.has(roomName) && rooms.get(roomName)?.[0] === 0) {
//             // Boş oda
//             user.roomName = roomName;
//             rooms.set(roomName, [1, user.id, -1, 0, 0, 0]);
//             color = 2;
//             connectedUsers.set(socket.id, user);
//         } else if (rooms.has(roomName) && rooms.get(roomName)?.[0] === 1) {
//             // Odada 1 kişi var
//             user.roomName = roomName;
//             const one = rooms.get(roomName)?.[1];
//             const two = rooms.get(roomName)?.[2];
//             if (one === -1) {
//                 rooms.set(roomName, [2, user.id, two!, 0, 0, 0]);
//             } else if (two === -1) {
//                 rooms.set(roomName, [2, one!, user.id, 0, 0, 0]);
//             }
//             color = 0;
//             connectedUsers.set(socket.id, user);
//         } else if (rooms.has(roomName) && rooms.get(roomName)?.[0] === 2) {
//             // Oda dolu
//             console.log(RB + "Oda dolu!" + R);
//             return;
//         } else if (!rooms.has(roomName)) {
//             user.roomName = roomName;
//             rooms.set(roomName, [1, user.id, -1, 0, 0]);
//             color = 2;
//             connectedUsers.set(socket.id, user);
//         }

//         socket.join(user.roomName);
//         console.log("usercount->", rooms.get(user.roomName)?.[0]);
//         connectedUsers.forEach(element => {
//             element.socket.emit('buttonUpdated', [user.roomName, color]);
//             if (element.roomName === roomName && rooms.get(user.roomName)?.[0] === 2) {
//                 element.socket.emit('userRegister', [element.id]);
//             }
//         });
//     });

// });

// app.get('/', function (request, response) {
//     response.sendFile('/home/dkarhan/transcendence/packages/nestjs/index.html'); // Yolu düzenle
// });

// app.get('/src/pong.js', function (request, response) {
//     response.sendFile(__dirname + '/pong.js'); // Yolu düzenle
// });

// app.get('/src/style.css', function (request, response) {
//     response.sendFile(__dirname + '/style.css'); // Yolu düzenle
// });

// server.listen(1234, function () {
//     console.log(`Listening on 1234`);
// });
