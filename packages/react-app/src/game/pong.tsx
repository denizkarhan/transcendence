import io, { Socket } from 'socket.io-client';
import { getCookie } from "../api";
import { useEffect, useRef, useState } from "react";
import { Button } from 'react-bootstrap';
import CountdownButton from './CountdownButton';
import BackgroundAnimation from '../BackgroundAnimation';
import { useNavigate, useParams } from 'react-router-dom';
import './a.css';

let modR = 1;
let gameStarter = 0;
let canvasWidth = 650;
let canvasHeight = 400;
let playerHeight = 80;
let playerWidth = 15;
let playerGravity = 4;
let a = 0;

interface CanvasWithSocket extends HTMLCanvasElement {
	socket: Socket;
}

class Eleman {
	x: number;
	y: number;
	width: number;
	height: number;
	color: string;
	speed: number;
	gravity: number;

	constructor(options: { x: number, y: number, width: number, height: number, color: string, speed?: number, gravity: number }) {
		this.x = options.x;
		this.y = options.y;
		this.width = options.width;
		this.height = options.height;
		this.color = options.color;
		this.speed = options.speed || 2;
		this.gravity = options.gravity;
	}
}

const playerOne: Eleman = new Eleman({ // first paddle (playerone)
	x: 10,
	y: canvasHeight / 2 - playerHeight / 2,
	width: playerWidth,
	height: playerHeight,
	color: "#fff",
	gravity: playerGravity,
});

const playerTwo: Eleman = new Eleman({ // second paddle (playertwo)
	x: canvasWidth - playerWidth - 10,
	y: canvasHeight / 2 - playerHeight / 2,
	width: playerWidth,
	height: playerHeight,
	color: "#fff",
	gravity: playerGravity,
});

// ball
const ball: Eleman = new Eleman({
	x: canvasWidth / 2,
	y: canvasHeight / 2,
	width: 15,
	height: 15,
	color: "#fff",
	speed: 3,
	gravity: 3,
});

function Game() {
	const { roomName } = useParams<string>();
	const navigate = useNavigate();
	const [buttonText, setButtonText] = useState('Winx Club');

	const canvasRef = useRef<CanvasWithSocket | null>(null);
	const [startCountdown, setStartCountdown] = useState(false);

	const handleStartCountdown = () => {
		setStartCountdown(true);
	};

	useEffect(() => {
		const canvas = canvasRef.current;
		const style: HTMLCanvasElement = document.querySelector('canvas')!;
		const roomButtons: HTMLCollectionOf<HTMLButtonElement> = document.getElementsByClassName("random-room-button") as HTMLCollectionOf<HTMLButtonElement>;

		if (!canvas)
			return;
		const context = canvas.getContext('2d');
		if (!context)
			return;
		canvas.socket = io("http://k2m13s05.42kocaeli.com.tr:3001/game", {
			auth: {
				nick: getCookie("42_auth_state"),
				token: getCookie("42_auth")
			},
		});
		canvas.width = canvasWidth;
		canvas.height = canvasHeight;
		style.width = canvas.width;
		style.height = canvas.height;
		let scoreOne: number = 0;
		let scoreTwo: number = 0;
		const trail: { x: number; y: number; }[] = [];
		const trailLength: number = 30;

		for (let i = 0; i < roomButtons.length; i++) { // Odaya giriş yapma butonu
			roomButtons[i].addEventListener("click", () => {
				const buttonText: string = roomButtons[i].innerText;
				canvas.socket.emit('enterRoom', { roomName: buttonText });
			});
		}
		if (myName !== undefined && enemyName !== undefined){
			canvas.socket.emit('enterRoom', { roomName: myName + enemyName });
		}
		const buttonColors: string[] = [
			"linear-gradient(to right, #964747d6, #bd1b1bca, #640206d7)",
			"linear-gradient(to right, #537dd1, #064ad1d4, #020f66)",
			"linear-gradient(to right, #6eb76cec, #169a0dd6, #043906)"
		];

		canvas.socket.on('userRegister', (data: any) => {
			drawElements();
		});

		window.addEventListener("keydown", (e) => {
			canvas.socket.emit('keydown', e.key + '*' + playerOne.y.toString() + '*' + playerTwo.y.toString() + '*' + playerOne.gravity.toString() + '*' + ball.x.toString() + '*' + ball.y.toString() + '*' + ball.speed.toString() + '*' + ball.gravity.toString());
		});

		// net
		let net: Eleman = new Eleman({
			x: canvas.width / 2,
			y: 5,
			width: 2,
			height: 10,
			color: "#fff",
			gravity: 0,
		});

		// draw net
		const drawNet = (element: Eleman) => {
			for (let index = 0; index < canvas.height / 20; index++) {
				drawElement(element);
				element.y += 20;
			}
			element.y = 5;
		}

		// player one score text
		const displayScoreOne = () => {
			context.font = "18px 'Press Start 2P', cursive";
			context.fillStyle = "#fff";
			context.fillText(scoreOne.toString(), canvas.width / 2 - 80, 30);
		}

		// player two score text
		const displayScoreTwo = () => {
			context.font = "18px 'Press Start 2P', cursive";
			context.fillStyle = "#fff";
			context.fillText(scoreTwo.toString(), canvas.width / 2 + 60, 30);
		}

		// draw elements
		const drawElement = (element: Eleman) => {
			context.fillStyle = element.color;
			context.fillRect(element.x, element.y, element.width, element.height);
		}

		const drawElementBall = (element: Eleman) => {
			context.fillStyle = element.color;
			context.beginPath();
			context.arc(
				element.x + element.width / 2,
				element.y + element.height / 2,
				element.width / 2,
				0,
				Math.PI * 2
			);
			context.closePath();
			context.fill();
		}

		const drawTrail = () => {
			for (let i = 0; i < trail.length; i++) {
				const alpha = i / trail.length; // İzlerin opaklığını belirlemek için alpha değerini hesapla
				const color = `rgba(${i * 4 * modR}, ${i * 4}, ${i * 4}, ${alpha})`; // Beyaz renkte izler
				context.fillStyle = color;
				context.fillRect(trail[i].x, trail[i].y, ball.width, ball.height);
			}
		}

		// make ball bounce
		const ballBounce = () => {
			trail.push({ x: ball.x, y: ball.y });

			if (trail.length > trailLength)
				trail.shift();

			ball.y += ball.gravity;
			ball.x += ball.speed;

			// Topun ekrana çarpması durumunda yönünü değiştir
			if (ball.y <= 0 || ball.y >= canvas.height - ball.height) {
				ball.gravity = -ball.gravity;
			}
			// Topun raketlere çarpması durumunda yönünü değiştir
			if ((ball.x <= playerOne.x + playerOne.width && ball.y + ball.height >= playerOne.y && ball.y <= playerOne.y + playerOne.height) ||
				(ball.x + ball.width >= playerTwo.x && ball.y + ball.height >= playerTwo.y && ball.y <= playerTwo.y + playerTwo.height)) { ball.speed = -ball.speed; }
			ballWallCollision();
		}

		// detect collision
		const ballWallCollision = () => {
			if (((ball.y + ball.gravity <= playerTwo.y + playerTwo.height) && (ball.y + ball.height + ball.gravity >= playerTwo.y) && (ball.x + ball.width + ball.speed >= playerTwo.x)) ||
				((ball.y + ball.gravity <= playerOne.y + playerOne.height) && (ball.y + ball.height + ball.gravity >= playerOne.y) && (ball.x + ball.speed <= playerOne.x + playerOne.width))) {
				if ((ball.x + ball.speed < playerOne.x + playerOne.width) || (ball.x + ball.width + ball.speed > playerTwo.x + playerTwo.width)) {
					ball.speed = ball.speed * -1;
				} else {
					ball.speed = ball.speed * -1;
					ball.y += ball.gravity * 2;
				}
			} else if (ball.x + ball.speed < playerOne.x) {
				scoreTwo += 1;
				canvas.socket.emit('scoreUpdate', { sOne: scoreOne, sTwo: scoreTwo }); // Sunucuya score bilgisini gönder
				ball.speed = ball.speed * -1;
				ball.x = canvas.width / 2;
				ball.y += ball.gravity;
			} else if (ball.x + ball.speed > playerTwo.x + playerTwo.width) {
				scoreOne += 1;
				canvas.socket.emit('scoreUpdate', { sOne: scoreOne, sTwo: scoreTwo }); // Sunucuya score bilgisini gönder
				ball.speed = ball.speed * -1;
				ball.x = canvas.width / 2;
				ball.y += ball.gravity;
			}
			drawElements();
		}

		// draw all elements
		const drawElements = () => {
			context.clearRect(0, 0, canvas.width, canvas.height);
			drawElement(playerOne);
			drawElement(playerTwo);
			drawElementBall(ball);
			drawNet(net);
			displayScoreOne();
			displayScoreTwo();
			drawTrail();
		}

		// oyunu başlatmak için startGame olayını dinleyin
		canvas.socket.on('startGame', (data: any) => {
			if (data[5] === 'f') {
				ball.color = "#fa44ab";
				ball.speed *= 1.5;
				ball.gravity *= 1.5;
				modR = 3;
				playerOne.gravity = playerGravity * 2;
				playerTwo.gravity = playerGravity * 2;
			}
			setInterval((data: any) => {
				if (gameStarter === 0)
					return;
				ballBounce();
			}, 16);
		});

		// diğer oyuncunun hareketini işlemek için movePlayer olayını dinleyin
		canvas.socket.on('movePlayer', (data: any) => {
			if (gameStarter === 0)
				return;
			a += 1;
			let vars = data.split('*');
			playerOne.y = parseInt(vars[0]);
			playerTwo.y = parseInt(vars[1]);
			if (a % 20 === 1) {
				ball.x = parseInt(vars[2]);
				ball.y = parseInt(vars[3]);
				ball.speed = parseInt(vars[4]);
				ball.gravity = parseInt(vars[5]);
			}
		});

		canvas.socket.on('countDown', (data: any) => {
			handleStartCountdown();
			setTimeout(() => {
				gameStarter = 1;
				var fastButton = document.getElementById("fastest");
				var clasicButton = document.getElementById("clasico");
				clasicButton!.style.display = 'none';
				fastButton!.style.display = 'none';
			}, 3000);
		});

		// Oyuncu odada tek kaldığında
		canvas.socket.on('userDisconnected', (data: any) => {
			if (data) {
				const textWidth = context.measureText("Your opponent has left the game, going to lobby...").width;
				context.fillStyle = "#fff";
				context.font = "bold 12px Arial";
				setTimeout(() => {
					context.fillText("Your opponent has left the game, going to lobby...", canvas.width / 2 - textWidth / 2, canvas.height / 2 + 6);
				}, 100);

				gameStarter = 0;
				setTimeout(() => {
					canvas.socket.disconnect();
					handleRefresh();
				}, 2000);
			}
		});

		// Oyun bitti şampiyonu belirle
		canvas.socket.on('gameOver', (data: any) => {
			context.fillStyle = "#fff";
			context.font = "bold 48px Arial";
			scoreOne = data!.scoreOne;
			scoreTwo = data!.scoreTwo;
			displayScoreOne();
			displayScoreTwo();
			const text = "Player " + data!.winner + " Winner!  You are going to lobby...";
			const textWidth = context.measureText(text).width;
			context.fillText(text, canvas.width / 2 - textWidth / 2, canvas.height / 2 + 24);
			gameStarter = 0;
			setTimeout(() => {
				handleRefresh();
			}, 3000);
		});

		canvas.socket.on('buttonUpdated', (roomAndColor: any) => {
			for (var i = 0; i < roomButtons.length; i++) { // Odaya giriş yapma butonu
				if (roomButtons[i].innerText === roomAndColor[0]) {
					roomButtons[i].style.background = buttonColors[roomAndColor[1]];
				}
			}
		});

		canvas.socket.on('viewVS', (modes: any) => {
			setButtonText(modes!.user1 + " VS " + modes!.user2);
		});

		canvas.socket.on('setMod', (modes: any) => {
			ball.color = "#fa44ab";
			ball.speed *= 1.5;
			ball.gravity *= 1.5;
			modR = 3;
			playerOne.gravity = playerGravity * 2;
			playerTwo.gravity = playerGravity * 2;
		});

		canvas.socket.on('viewMods', (modes: any) => {
			for (var i = 0; i < roomButtons.length; i++) {
				roomButtons[i].style.display = "none";
			}

			var myCanvas = document.getElementById("pongGame");
			var mainText = document.getElementById("header");
			myCanvas!.style.display = 'block';
			mainText!.style.display = 'block';

			if (modes.flag === 1) { // ilk oyuncu girişi
				var clasicButton = document.getElementById("clasico");
				var fastButton = document.getElementById("fastest");
				clasicButton!.style.display = 'block';
				fastButton!.style.display = 'block';
			}
		});


		if (roomName !== undefined){
			window.history.replaceState(undefined, '', '/game');
			canvas.socket.emit('enterRoom',{roomName : roomName});
		}

		return() => {
			canvas.socket.off('buttonUpdated');
			canvas.socket.off('viewVS');
			canvas.socket.off('setMod');
			canvas.socket.off('gameOver');
			canvas.socket.off('countDown');
			canvas.socket.off('userDisconnected');
			canvas.socket.off('movePlayer');
			canvas.socket.off('startGame');
			canvas.socket.off('userRegister');
			canvas.socket.off('viewMods');
			canvas.socket.disconnect();
		}
	}, []);

	const handleRefresh = () => {
		window.location.reload();
	};

	const clasicMode = () => {
		var clasicButton = document.getElementById("clasico");
		var fastButton = document.getElementById("fastest");
		clasicButton!.style.display = 'none';
		fastButton!.style.display = 'none';
	};

	const fastMode = () => {
		const canvas = canvasRef!.current;
		canvas!.socket.emit('gameMod', { mod: 'f' });
		var clasicButton = document.getElementById("clasico");
		var fastButton = document.getElementById("fastest");
		clasicButton!.style.display = 'none';
		fastButton!.style.display = 'none';
	};

	return (
		<div>
			<BackgroundAnimation />
			<div id='button-div'>
				<button id="clasico" className='clasic-mod' onClick={clasicMode}>
					<span className="clasic-mod-text-one">Clasic Mod</span>
					<span className="clasic-mod-text-two">Start!</span>
				</button>
				<button id="fastest" className='fast-mod' onClick={fastMode}>
					<span className="fast-mod-text-one">Fast Mod</span>
					<span className="fast-mod-text-two">Start!</span>
				</button>
					<Button id="header" className='mainText'>{buttonText}</Button>
					<Button className='random-room-button'>Hemen Oyna</Button>
					<Button className='random-room-button'>room1</Button>
					<Button className='random-room-button'>room2</Button>
					<Button className='random-room-button'>room3</Button>
					<Button className='random-room-button'>room4</Button>
					<Button className='random-room-button'>room5</Button>
					<Button className='random-room-button'>room6</Button>
					{startCountdown && <CountdownButton />}
			</div>
			<div id="text-container"></div>
			<canvas ref={canvasRef} id="pongGame" style={{ backgroundColor: 'black', cursor: 'default', zIndex: '0' }}></canvas>
		</div>
	);
}

export default Game;
