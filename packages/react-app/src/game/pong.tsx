import io, { Socket } from 'socket.io-client';
import { getCookie } from "../api";
import { useEffect, useRef, useState } from "react";
import { Button } from 'react-bootstrap';
import CountdownButton from './CountdownButton';
import BackgroundAnimation from './BackgroundAnimation';
import './a.css';

let x = 0;
let modR = 1;
let gameStarter = 0;
let canvasWidth = 750;
let canvasHeight = 500;
let playerHeight = 80;
let playerWidth = 15;

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
	gravity: 3,
});

const playerTwo: Eleman = new Eleman({ // second paddle (playertwo)
	x: canvasWidth - playerWidth - 10,
	y: canvasHeight / 2 - playerHeight / 2,
	width: playerWidth,
	height: playerHeight,
	color: "#fff",
	gravity: 3,
});

// ball
const ball: Eleman = new Eleman({
	x: canvasWidth / 2,
	y: canvasHeight / 2,
	width: 15,
	height: 15,
	color: "#fff",
	speed: 1,
	gravity: 1,
});

function Game() {
	const [buttonText, setButtonText] = useState('Winx Club');

	const changeText = () => {
		setButtonText('Yeni Yazı');
	};

	const canvasRef = useRef<CanvasWithSocket | null>(null);
	const [startCountdown, setStartCountdown] = useState(false);

	const handleStartCountdown = () => {
		setStartCountdown(true);
	};

	useEffect(() => {
		const canvas = canvasRef.current;//document.getElementById("pongGame") as CanvasWithSocket;
		const style: HTMLCanvasElement = document.querySelector('canvas')!;
		const roomButtons: HTMLCollectionOf<HTMLButtonElement> = document.getElementsByClassName("random-room-button") as HTMLCollectionOf<HTMLButtonElement>;

		if (!canvas) {
			console.log("canvas yok");
			return;
		}
		const context = canvas.getContext('2d');
		if (!context)
			return;
		canvas.socket = io("http://k2m13s05.42kocaeli.com.tr:3001/game", {
			auth: {
				nick: getCookie("42_auth_state"),
				token: getCookie("42_auth")
			},
		});
		canvas.width = 750;
		canvas.height = 500;
		style.width = canvas.width;
		style.height = canvas.height;
		let scoreOne: number = 0;
		let scoreTwo: number = 0;
		let intervalID: NodeJS.Timer;
		const trail: { x: number; y: number; }[] = [];
		const trailLength: number = 50;

		for (let i = 0; i < roomButtons.length; i++) { // Odaya giriş yapma butonu
			roomButtons[i].addEventListener("click", () => {
				const buttonText: string = roomButtons[i].innerText;
				canvas.socket.emit('enterRoom', { roomName: buttonText });
			});
		}

		const buttonColors: string[] = [
			"linear-gradient(to right, #964747d6, #bd1b1bca, #640206d7)",
			"linear-gradient(to right, #6eb76cec, #169a0dd6, #043906)",
			"linear-gradient(to right, #537dd1, #064ad1d4, #020f66)"
		];

		canvas.socket.on('userRegister', (data: any) => { // Kullanıcıları kaydediyorum ama kullanmadım daha
			drawElements(); // Oyun elemanları yükleniyor
		});

		window.addEventListener("keydown", (e) => {
			canvas.socket.emit('keydown', {
				key: e.key,
				sOne: scoreOne,
				sTwo: scoreTwo,
				pOne: playerOne,
				pTwo: playerTwo,
				ball: ball,
				flag: x++
			});
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

			if (trail.length > trailLength) {
				trail.shift(); // En eski konumu kaldır
			}

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
					ball.y += ball.gravity;
				}
			} else if (ball.x + ball.speed < playerOne.x) {
				scoreTwo += 1;
				ball.speed = ball.speed * -1;
				ball.x = canvas.width / 2;
				ball.y += ball.gravity;
			} else if (ball.x + ball.speed > playerTwo.x + playerTwo.width) {
				scoreOne++;
				ball.speed = ball.speed * -1;
				ball.x = canvas.width / 2;
				ball.y += ball.gravity;
			}
			canvas.socket.emit('scoreUpdate', { sOne: scoreOne, sTwo: scoreTwo }); // Sunucuya score bilgisini gönder
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
			intervalID = setInterval((data: any) => {
				if (gameStarter === 0)
					return;
				ballBounce();
			}, 0);
		});

		// diğer oyuncunun hareketini işlemek için movePlayer olayını dinleyin
		canvas.socket.on('movePlayer', (data: any) => {
			if (gameStarter === 0)
				return;
			playerOne.y = data[0].y;
			playerTwo.y = data[1].y;
			scoreOne = data[2];
			scoreTwo = data[3];
			ball.x = data[4].x;
			ball.y = data[4].y;
			ball.speed = data[4].speed;
			ball.gravity = data[4].gravity;
			ball.color = data[4].color;
		});

		canvas.socket.on('countDown', (data: any) => {
			handleStartCountdown();
			setTimeout(() => {
				gameStarter = 1;
			}, 3000);
		});

		const waitingRoom = () => {
			context.font = "28px 'Press Start 2P', cursive";
			context.fillStyle = "#fff";
			context.fillText("Oyuncu Bekleniyor!", canvas.width / 2 - 200, canvas.height / 2);
		}

		// Oyuncu odada tek kaldığında
		canvas.socket.on('userDisconnected', (data: any) => {
			if (data) {
				clearInterval(intervalID);
				waitingRoom();
			}
		});

		// Oyun bitti şampiyonu belirle
		canvas.socket.on('gameOver', (data: any) => {
			context.font = "30px 'Press Start 2P', cursive";
			context.fillStyle = "#fff";
			context.fillText("Oyuncu " + data + " Kazandı!", canvas.width / 2 - 250, (3 * canvas.height) / 4);
			// var button = document.getElementById("buton-div").querySelector("button");
			var buttonDiv = document.getElementById("buton-div");
			var button = buttonDiv ? buttonDiv.getElementsByTagName("button")[0] : null;
			if (button)
				button.style.display = "block";
			clearInterval(intervalID);

			scoreOne = 0;
			scoreTwo = 0;
			playerOne.y = canvasHeight / 2 - playerHeight / 2;
			playerTwo.y = canvasHeight / 2 - playerHeight / 2;
			ball.x = canvasWidth / 2;
			ball.y = canvasHeight / 2;
			gameStarter = 0;
			x = 0;

			const buttonContainer = document.querySelector('.button-container') as HTMLElement;
			if (buttonContainer) {
				buttonContainer.style.zIndex = '9999';
				buttonContainer.style.position = 'static';
			}

			const buttonFull = document.querySelector('.button') as HTMLElement;
			if (buttonFull) {
				buttonFull.style.zIndex = '9999';
				buttonFull.style.position = 'fixed';
				buttonFull.style.top = '50%';
				buttonFull.style.right = '40%';
				buttonFull.style.width = '250px';
				buttonFull.style.height = '100px';
				buttonFull.style.fontSize = '25px';
			}
		});

		canvas.socket.on('buttonUpdated', (roomAndColor: any) => {
			for (var i = 0; i < roomButtons.length; i++) { // Odaya giriş yapma butonu
				if (roomButtons[i].innerText === roomAndColor[0]) {
					roomButtons[i].style.background = buttonColors[roomAndColor[1]];
				}
			}
		});

		canvas.socket.on('windowToGame', (modes: any) => {
			if (modes.flag === 2) {
				modR = 3;
				ball.color = "#fa44ab";
				ball.speed = 1.5;
				ball.gravity = 1.5;
				playerOne.gravity = 5;
				playerTwo.gravity = 5;
				var div = document.getElementById('fastest');
				div!.style.background = "#fbce0f";

				return;
			}

			for (var i = 0; i < roomButtons.length; i++) {
				roomButtons[i].style.display = "none";
			}
			var myCanvas = document.getElementById("pongGame");
			myCanvas!.style.display = 'block';
			var mainText = document.getElementById("header");
			mainText!.style.display = 'block';

			if (modes.flag === 1) { // ilk oyuncu girişi
				var clasicButton = document.getElementById("clasico");
				var fastButton = document.getElementById("fastest");
				clasicButton!.style.display = 'block';
				fastButton!.style.display = 'block';
				setButtonText('PLAYER IS EXPECTED...');
			} else if (modes.flag === 0) {
				setButtonText(modes!.user1 + " VS " + modes!.user2);
			}
		});
	}, []);

	const handleRefresh = () => {
		window.location.reload();
	};

	const clasicMode = () => {
		const canvas = canvasRef!.current;
		// canvas!.socket.emit('gameMod', {ballSpeed: 1, ballGravity: 1, backG: "#1bc4f6"});
		canvas!.socket.emit('gameMod', { mod: 'c' });

		// ball.speed = 1;
		// ball.gravity = 1;
		// var div = document.getElementById('clasico');
		// div!.style.background = "#1bc4f6";

		var clasicButton = document.getElementById("clasico");
		var fastButton = document.getElementById("fastest");
		clasicButton!.style.display = 'none';
		fastButton!.style.display = 'none';
	};

	const fastMode = () => {
		const canvas = canvasRef!.current;
		// canvas!.socket.emit('gameMod', {ballSpeed: 1.5, ballGravity: 1.5, backG: "#fa44ab", modR: 3, playerGravity: 5});
		canvas!.socket.emit('gameMod', { mod: 'f' });

		// modR = 3;
		// ball.color = "#fa44ab";
		// ball.speed = 1.5;
		// ball.gravity = 1.5;
		// playerOne.gravity = 5;
		// playerTwo.gravity = 5;
		// var div = document.getElementById('fastest');
		// div!.style.background = "#fbce0f";

		var clasicButton = document.getElementById("clasico");
		var fastButton = document.getElementById("fastest");
		clasicButton!.style.display = 'none';
		fastButton!.style.display = 'none';
	};

	return (
		<div>
			{/* <button class="sallanan-buton">Tıkla</button> */}
			<BackgroundAnimation />
			<div id='button-div'>
				<Button id="clasico" className='clasic-mod' onClick={clasicMode}>Clasic Mod</Button>
				<Button id="fastest" className='fast-mod' onClick={fastMode}>Fast Mod</Button>
				<Button id="header" className='mainText'>{buttonText}</Button>
				<Button className='random-room-button'>Hemen Oyna</Button>
				<Button className='random-room-button'>room1</Button>
				<Button className='random-room-button'>room2</Button>
				<Button className='random-room-button'>room3</Button>
				<Button className='random-room-button'>room4</Button>
				<Button className='random-room-button'>room5</Button>
				<Button className='random-room-button'>room6</Button>
				<div id="refresh" className="button-container">
					<button className="button" onClick={handleRefresh}>
						<span>Back to lobby</span>
					</button>
				</div>
				{startCountdown && <CountdownButton />}
			</div>
			<div id="text-container"></div>
			<canvas ref={canvasRef} id="pongGame" style={{ backgroundColor: 'black', cursor: 'default', zIndex: '0' }}></canvas>
		</div>
	);
}

export default Game;
