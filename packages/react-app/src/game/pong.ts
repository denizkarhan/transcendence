// import io, { Socket } from 'socket.io-client';
// import { getCookie } from "../api";
// import React, { useEffect, useRef } from "react";
// import { Canvas } from 'react-canvas';

// interface CanvasWithSocket extends HTMLCanvasElement {
// 	socket: Socket;
// }

// class Eleman {
// 	x: number;
// 	y: number;
// 	width: number;
// 	height: number;
// 	color: string;
// 	speed: number;
// 	gravity: number;

// 	constructor(options: { x: number, y: number, width: number, height: number, color: string, speed?: number, gravity: number }) {
// 		this.x = options.x;
// 		this.y = options.y;
// 		this.width = options.width;
// 		this.height = options.height;
// 		this.color = options.color;
// 		this.speed = options.speed || 2;
// 		this.gravity = options.gravity;
// 	}
// }

// const Game = () => {

// 	const canvas = document.getElementById("pongGame") as CanvasWithSocket;
// 	const context: CanvasRenderingContext2D = canvas.getContext("2d")!;
// 	const style: HTMLCanvasElement = document.querySelector('canvas')!;
// 	const buttons = document.getElementsByClassName("room-button") as HTMLCollectionOf<HTMLButtonElement>;
// 	const randomButton: HTMLCollectionOf<HTMLButtonElement> = document.getElementsByClassName("random-room-button") as HTMLCollectionOf<HTMLButtonElement>;
// 	const textContainer: HTMLElement = document.getElementById("text-container")!;

// 	useEffect(() => {

// 		canvas.width = 750;
// 		canvas.height = 500;
// 		style.width = canvas.width;
// 		style.height = canvas.height;

// 		let playerHeight: number = 80;
// 		let playerWidth: number = 15;
// 		let scoreOne: number = 0;
// 		let scoreTwo: number = 0;
// 		let intervalID: number = 0;

// 		const trail: { x: number; y: number; }[] = [];
// 		const trailLength: number = 50;

// 		const addTextToPage = (text: string) => {
// 			textContainer.innerText = text;
// 			textContainer.style.position = "fixed";
// 			textContainer.style.font = "16px 'Press Start 2P', cursive";
// 			textContainer.style.top = "20%";
// 			textContainer.style.left = "50%";
// 			textContainer.style.color = "white";
// 			textContainer.style.transform = "translate(-50%, -50%)";
// 			textContainer.style.cursor = "default";
// 		}



// 		for (let i = 0; i < buttons.length; i++) { // Odaya giriş yapma butonu
// 			buttons[i].addEventListener("click", () => {
// 				const buttonText: string = buttons[i].innerText;
// 				console.log("Tıklanan buton: " + buttonText);
// 				canvas.socket.emit('enterRoom', buttonText);
// 			});
// 		}

// 		randomButton[0].addEventListener("click", () => {
// 			const buttonText: string = randomButton[0].innerText;
// 			console.log("Tıklanan buton: " + buttonText);
// 			canvas.socket.emit('enterRoom', buttonText);
// 		});

// 		const buttonColors: string[] = [
// 			"linear-gradient(to right, #964747d6, #bd1b1bca, #640206d7)",
// 			"linear-gradient(to right, #6ac364, #28a51fd6, #024c05)",
// 			"linear-gradient(to right, #537dd1, #064ad1d4, #020f66)"
// 		];

// 		canvas.socket.on('userRegister', (data: any) => { // Kullanıcıları kaydediyorum ama kullanmadım daha
// 			addTextToPage("<Pong Game>" + " | User ID: " + data[0]);
// 			drawElements(); // Oyun elemanları yükleniyor
// 		});

// 		const doKeyPress = (e: KeyboardEvent) => { // Oyun ekranındaki tuşları dinle ve server'a yolluyor
// 			canvas.socket.emit('keydown', e.key, [playerOne, playerTwo, scoreOne, scoreTwo, ball]); // Sunucuya hareket bilgisini gönder
// 		}



// 		const playerOne: Eleman = new Eleman({ // first paddle (playerone)
// 			x: 10,
// 			y: canvas.height / 2 - playerHeight / 2,
// 			width: playerWidth,
// 			height: playerHeight,
// 			color: "#fff",
// 			gravity: 3,
// 		});

// 		const playerTwo: Eleman = new Eleman({ // second paddle (playertwo)
// 			x: canvas.width - playerWidth - 10,
// 			y: canvas.height / 2 - playerHeight / 2,
// 			width: playerWidth,
// 			height: playerHeight,
// 			color: "#fff",
// 			gravity: 3,
// 		});

// 		// ball
// 		const ball: Eleman = new Eleman({
// 			x: canvas.width / 2,
// 			y: canvas.height / 2,
// 			width: 15,
// 			height: 15,
// 			color: "#fff",
// 			speed: 1,
// 			gravity: 1,
// 		});

// 		// net
// 		let net: Eleman = new Eleman({
// 			x: canvas.width / 2,
// 			y: 5,
// 			width: 2,
// 			height: 10,
// 			color: "#fff",
// 			gravity: 0,
// 		});

// 		// draw net
// 		const drawNet = (element: Eleman) => {
// 			for (let index = 0; index < canvas.height / 20; index++) {
// 				drawElement(element);
// 				element.y += 20;
// 			}
// 			element.y = 5;
// 		}

// 		// player one score text
// 		const displayScoreOne = () => {
// 			context.font = "18px 'Press Start 2P', cursive";
// 			context.fillStyle = "#fff";
// 			context.fillText(scoreOne.toString(), canvas.width / 2 - 80, 30);
// 		}

// 		// player two score text
// 		const displayScoreTwo = () => {
// 			context.font = "18px 'Press Start 2P', cursive";
// 			context.fillStyle = "#fff";
// 			context.fillText(scoreTwo.toString(), canvas.width / 2 + 60, 30);
// 		}

// 		// draw elements
// 		const drawElement = (element: Eleman) => {
// 			context.fillStyle = element.color;
// 			context.fillRect(element.x, element.y, element.width, element.height);
// 		}

// 		const drawElementBall = (element: Eleman) => {
// 			// context.fillStyle = element.color;
// 			// context.beginPath();
// 			// context.arc(element.x + element.width / 2, element.y + element.height / 2, element.width / 2, 0, Math.PI * 2);
// 			// context.fill();
// 			context.fillStyle = element.color;
// 			context.beginPath();
// 			context.arc(
// 				element.x + element.width / 2,
// 				element.y + element.height / 2,
// 				element.width / 2,
// 				0,
// 				Math.PI * 2
// 			);
// 			context.closePath();
// 			context.fill();
// 		}

// 		const drawTrail = () => {
// 			for (let i = 0; i < trail.length; i++) {
// 				const alpha = i / trail.length; // İzlerin opaklığını belirlemek için alpha değerini hesapla
// 				const color = `rgba(${i * 4}, ${i * 4}, ${i * 4}, ${alpha})`; // Beyaz renkte izler

// 				context.fillStyle = color;
// 				context.fillRect(trail[i].x, trail[i].y, ball.width, ball.height);
// 			}
// 		}

// 		// make ball bounce
// 		const ballBounce = () => {
// 			trail.push({ x: ball.x, y: ball.y });

// 			if (trail.length > trailLength) {
// 				trail.shift(); // En eski konumu kaldır
// 			}

// 			ball.y += ball.gravity;
// 			ball.x += ball.speed;

// 			// Topun ekrana çarpması durumunda yönünü değiştir
// 			if (ball.y <= 0 || ball.y >= canvas.height - ball.height) {
// 				ball.gravity = -ball.gravity;
// 			}

// 			// Topun raketlere çarpması durumunda yönünü değiştir
// 			if ((ball.x <= playerOne.x + playerOne.width && ball.y + ball.height >= playerOne.y && ball.y <= playerOne.y + playerOne.height) ||
// 				(ball.x + ball.width >= playerTwo.x && ball.y + ball.height >= playerTwo.y && ball.y <= playerTwo.y + playerTwo.height)) { ball.speed = -ball.speed; }
// 			ballWallCollision();
// 		}

// 		// detect collision
// 		const ballWallCollision = () => {
// 			if (((ball.y + ball.gravity <= playerTwo.y + playerTwo.height) && (ball.y + ball.height + ball.gravity >= playerTwo.y) && (ball.x + ball.width + ball.speed >= playerTwo.x)) ||
// 				((ball.y + ball.gravity <= playerOne.y + playerOne.height) && (ball.y + ball.height + ball.gravity >= playerOne.y) && (ball.x + ball.speed <= playerOne.x + playerOne.width))) {
// 				if ((ball.x + ball.speed < playerOne.x + playerOne.width) || (ball.x + ball.width + ball.speed > playerTwo.x + playerTwo.width)) {
// 					ball.speed = ball.speed * -1;
// 				} else {
// 					ball.speed = ball.speed * -1;
// 					ball.y += ball.gravity;
// 				}
// 			} else if (ball.x + ball.speed < playerOne.x) {
// 				scoreTwo += 1;
// 				ball.speed = ball.speed * -1;
// 				ball.x = canvas.width / 2;
// 				ball.y += ball.gravity;
// 			} else if (ball.x + ball.speed > playerTwo.x + playerTwo.width) {
// 				scoreOne += 1;
// 				ball.speed = ball.speed * -1;
// 				ball.x = canvas.width / 2;
// 				ball.y += ball.gravity;
// 			}
// 			canvas.socket.emit('scoreUpdate', scoreOne, scoreTwo); // Sunucuya score bilgisini gönder
// 			drawElements();
// 		}

// 		// draw all elements
// 		const drawElements = () => {
// 			context.clearRect(0, 0, canvas.width, canvas.height);
// 			drawElement(playerOne);
// 			drawElement(playerTwo);
// 			drawElementBall(ball);
// 			drawNet(net);
// 			displayScoreOne();
// 			displayScoreTwo();
// 			drawTrail();
// 		}

// 		// oyunu başlatmak için startGame olayını dinleyin
// 		canvas.socket.on('startGame', (data: any) => {
// 			intervalID = setInterval((data: any) => {
// 				ballBounce();
// 			}, 0);
// 		});

// 		// diğer oyuncunun hareketini işlemek için movePlayer olayını dinleyin
// 		canvas.socket.on('movePlayer', (data: any) => {
// 			playerOne.y = data[0].y;
// 			playerTwo.y = data[1].y;
// 			scoreOne = data[2];
// 			scoreTwo = data[3];
// 			ball.x = data[4].x;
// 			ball.y = data[4].y;
// 			ball.speed = data[4].speed;
// 			ball.gravity = data[4].gravity;
// 		});

// 		const waitingRoom = () => {
// 			context.font = "28px 'Press Start 2P', cursive";
// 			context.fillStyle = "#fff";
// 			context.fillText("Oyuncu Bekleniyor!", canvas.width / 2 - 200, canvas.height / 2);
// 		}

// 		// Oyuncu odada tek kaldığında
// 		canvas.socket.on('userDisconnected', (data: any) => {
// 			if (data) {
// 				clearInterval(intervalID);
// 				waitingRoom();
// 			}
// 		});

// 		// Oyun bitti şampiyonu belirle
// 		canvas.socket.on('gameOver', (data: any) => {
// 			context.font = "30px 'Press Start 2P', cursive";
// 			context.fillStyle = "#fff";
// 			context.fillText("Oyuncu " + data + " Kazandı!", canvas.width / 2 - 250, (3 * canvas.height) / 4);
// 			// var button = document.getElementById("buton-div").querySelector("button");
// 			var buttonDiv = document.getElementById("buton-div");
// 			var button = buttonDiv ? buttonDiv.getElementsByTagName("button")[0] : null;
// 			if (button)
// 				button.style.display = "block";
// 			clearInterval(intervalID);
// 			scoreOne = 0;
// 			scoreTwo = 0;
// 		});

// 		canvas.socket.on('buttonUpdated', (roomAndColor: any) => {
// 			console.log("Room:", roomAndColor[0]);
// 			console.log("Color:", roomAndColor[1]);
// 			for (var i = 0; i < buttons.length; i++) { // Odaya giriş yapma butonu
// 				if (buttons[i].innerText == roomAndColor[0]) {
// 					buttons[i].style.background = buttonColors[roomAndColor[1]];
// 				}
// 			}
// 		});
// 		window.addEventListener("keydown", doKeyPress, false);

// 	}, []);

// 	// return <Canvas ref={canvas} />;

// }
// export default Game;

// // interface CanvasWithSocket extends HTMLCanvasElement {
// //     socket: Socket;
// // }

// // const canvas = document.getElementById("pongGame") as CanvasWithSocket;
// // if (!canvas) { throw new Error("Canvas element 'pongGame' not found."); }

// // const context: CanvasRenderingContext2D = canvas.getContext("2d")!;
// // const style: HTMLCanvasElement = document.querySelector('canvas')!;
// // canvas.socket = io();

// // const buttons: HTMLCollectionOf<HTMLButtonElement> = <HTMLCollectionOf<HTMLButtonElement>>document.getElementsByClassName("room-button");
// // if (buttons.length === 0) { throw new Error("No elements found with class 'room-button'."); }  

// // const randomButton: HTMLCollectionOf<HTMLButtonElement> = <HTMLCollectionOf<HTMLButtonElement>>document.getElementsByClassName("random-room-button");
// // if (randomButton.length === 0) { throw new Error("No elements found with class 'random-room-button'."); }

// // const textContainer: HTMLElement = document.getElementById("text-container")!;
// // if (!textContainer) { throw new Error("Text container element 'text-container' not found."); }

// // canvas.width = 750;
// // canvas.height = 500;
// // style.width = canvas.width;
// // style.height = canvas.height;

// // let playerHeight: number = 80;
// // let playerWidth: number = 15;
// // let scoreOne: number = 0;
// // let scoreTwo: number = 0;
// // let intervalID: number = 0;

// // const trail: { x: number; y: number; }[] = [];
// // const trailLength: number = 50;

// // function addTextToPage(text: string): void {
// // 	textContainer.innerText = text;
// // 	textContainer.style.position = "fixed";
// // 	textContainer.style.font = "16px 'Press Start 2P', cursive";
// // 	textContainer.style.top = "20%";
// // 	textContainer.style.left = "50%";
// // 	textContainer.style.color = "white";
// // 	textContainer.style.transform = "translate(-50%, -50%)";
// // 	textContainer.style.cursor = "default";
// // }

// // window.addEventListener("keypress", doKeyPress, false); // Tuşları dinleme


// // for (let i = 0; i < buttons.length; i++) { // Odaya giriş yapma butonu
// // 	buttons[i].addEventListener("click", function () {
// // 		const buttonText: string = buttons[i].innerText;
// // 		console.log("Tıklanan buton: " + buttonText);
// // 		canvas.socket.emit('enterRoom', buttonText);
// // 	});
// // }

// // randomButton[0].addEventListener("click", function () {
// // 	const buttonText: string = randomButton[0].innerText;
// // 	console.log("Tıklanan buton: " + buttonText);
// // 	canvas.socket.emit('enterRoom', buttonText);
// // });

// // const buttonColors: string[] = [
// // 	"linear-gradient(to right, #964747d6, #bd1b1bca, #640206d7)",
// // 	"linear-gradient(to right, #6ac364, #28a51fd6, #024c05)",
// // 	"linear-gradient(to right, #537dd1, #064ad1d4, #020f66)"
// // ];

// // canvas.socket.on('userRegister', function (data) { // Kullanıcıları kaydediyorum ama kullanmadım daha
// // 	addTextToPage("<Pong Game>" + " | User ID: " + data[0]);
// // 	drawElements(); // Oyun elemanları yükleniyor
// // });

// // function doKeyPress(e: KeyboardEvent) { // Oyun ekranındaki tuşları dinle ve server'a yolluyor
// // 	canvas.socket.emit('keydown', e.key, [playerOne, playerTwo, scoreOne, scoreTwo, ball]); // Sunucuya hareket bilgisini gönder
// // }



// // const playerOne: Eleman = new Eleman({ // first paddle (playerone)
// // 	x: 10,
// // 	y: canvas.height / 2 - playerHeight / 2,
// // 	width: playerWidth,
// // 	height: playerHeight,
// // 	color: "#fff",
// // 	gravity: 3,
// // });

// // const playerTwo: Eleman = new Eleman({ // second paddle (playertwo)
// // 	x: canvas.width - playerWidth - 10,
// // 	y: canvas.height / 2 - playerHeight / 2,
// // 	width: playerWidth,
// // 	height: playerHeight,
// // 	color: "#fff",
// // 	gravity: 3,
// // });

// // // ball
// // const ball: Eleman = new Eleman({
// // 	x: canvas.width / 2,
// // 	y: canvas.height / 2,
// // 	width: 15,
// // 	height: 15,
// // 	color: "#fff",
// // 	speed: 1,
// // 	gravity: 1,
// // });

// // // net
// // let net: Eleman = new Eleman({
// // 	x: canvas.width / 2,
// // 	y: 5,
// // 	width: 2,
// // 	height: 10,
// // 	color: "#fff",
// // 	gravity: 0,
// // });

// // // draw net
// // function drawNet(element: Eleman): void {
// // 	for (let index = 0; index < canvas.height / 20; index++) {
// // 		drawElement(element);
// // 		element.y += 20;
// // 	}
// // 	element.y = 5;
// // }

// // // player one score text
// // function displayScoreOne() {
// // 	context.font = "18px 'Press Start 2P', cursive";
// // 	context.fillStyle = "#fff";
// // 	context.fillText(scoreOne.toString(), canvas.width / 2 - 80, 30);
// // }

// // // player two score text
// // function displayScoreTwo() {
// // 	context.font = "18px 'Press Start 2P', cursive";
// // 	context.fillStyle = "#fff";
// // 	context.fillText(scoreTwo.toString(), canvas.width / 2 + 60, 30);
// // }

// // // draw elements
// // function drawElement(element: Eleman) {
// // 	context.fillStyle = element.color;
// // 	context.fillRect(element.x, element.y, element.width, element.height);
// // }

// // function drawElementBall(element: Eleman) {
// // 	context.fillStyle = element.color;
// // 	context.beginPath();
// // 	context.arc(element.x + element.width / 2, element.y + element.height / 2, element.width / 2, 0, Math.PI * 2);
// // 	context.fill();
// // }

// // function drawTrail() {
// // 	for (let i = 0; i < trail.length; i++) {
// // 		const alpha = i / trail.length; // İzlerin opaklığını belirlemek için alpha değerini hesapla
// // 		const color = `rgba(${i * 4}, ${i * 4}, ${i * 4}, ${alpha})`; // Beyaz renkte izler

// // 		context.fillStyle = color;
// // 		context.fillRect(trail[i].x, trail[i].y, ball.width, ball.height);
// // 	}
// // }

// // // make ball bounce
// // function ballBounce() {
// // 	trail.push({ x: ball.x, y: ball.y });

// // 	if (trail.length > trailLength) {
// // 		trail.shift(); // En eski konumu kaldır
// // 	}

// // 	ball.y += ball.gravity;
// // 	ball.x += ball.speed;

// // 	// Topun ekrana çarpması durumunda yönünü değiştir
// // 	if (ball.y <= 0 || ball.y >= canvas.height - ball.height) {
// // 		ball.gravity = -ball.gravity;
// // 	}

// // 	// Topun raketlere çarpması durumunda yönünü değiştir
// // 	if ((ball.x <= playerOne.x + playerOne.width && ball.y + ball.height >= playerOne.y && ball.y <= playerOne.y + playerOne.height) ||
// // 		(ball.x + ball.width >= playerTwo.x && ball.y + ball.height >= playerTwo.y && ball.y <= playerTwo.y + playerTwo.height)) { ball.speed = -ball.speed; }
// // 	ballWallCollision();
// // }

// // // detect collision
// // function ballWallCollision() {
// // 	if (((ball.y + ball.gravity <= playerTwo.y + playerTwo.height) && (ball.y + ball.height + ball.gravity >= playerTwo.y) && (ball.x + ball.width + ball.speed >= playerTwo.x)) ||
// // 		((ball.y + ball.gravity <= playerOne.y + playerOne.height) && (ball.y + ball.height + ball.gravity >= playerOne.y) && (ball.x + ball.speed <= playerOne.x + playerOne.width))) {
// // 		if ((ball.x + ball.speed < playerOne.x + playerOne.width) || (ball.x + ball.width + ball.speed > playerTwo.x + playerTwo.width)) {
// // 			ball.speed = ball.speed * -1;
// // 		} else {
// // 			ball.speed = ball.speed * -1;
// // 			ball.y += ball.gravity;
// // 		}
// // 	} else if (ball.x + ball.speed < playerOne.x) {
// // 		scoreTwo += 1;
// // 		ball.speed = ball.speed * -1;
// // 		ball.x = canvas.width / 2;
// // 		ball.y += ball.gravity;
// // 	} else if (ball.x + ball.speed > playerTwo.x + playerTwo.width) {
// // 		scoreOne += 1;
// // 		ball.speed = ball.speed * -1;
// // 		ball.x = canvas.width / 2;
// // 		ball.y += ball.gravity;
// // 	}
// // 	canvas.socket.emit('scoreUpdate', scoreOne, scoreTwo); // Sunucuya score bilgisini gönder
// // 	drawElements();
// // }

// // // draw all elements
// // function drawElements() {
// // 	context.clearRect(0, 0, canvas.width, canvas.height);
// // 	drawElement(playerOne);
// // 	drawElement(playerTwo);
// // 	drawElementBall(ball);
// // 	drawNet(net);
// // 	displayScoreOne();
// // 	displayScoreTwo();
// // 	drawTrail();
// // }

// // // oyunu başlatmak için startGame olayını dinleyin
// // canvas.socket.on('startGame', function (data) {
// // 	intervalID = setInterval(function (data) {
// // 		ballBounce();
// // 	}, 0);
// // });

// // // diğer oyuncunun hareketini işlemek için movePlayer olayını dinleyin
// // canvas.socket.on('movePlayer', function (data) {
// // 	playerOne.y = data[0].y;
// // 	playerTwo.y = data[1].y;
// // 	scoreOne = data[2];
// // 	scoreTwo = data[3];
// // 	ball.x = data[4].x;
// // 	ball.y = data[4].y;
// // 	ball.speed = data[4].speed;
// // 	ball.gravity = data[4].gravity;
// // });

// // function waitingRoom() {
// // 	context.font = "28px 'Press Start 2P', cursive";
// // 	context.fillStyle = "#fff";
// // 	context.fillText("Oyuncu Bekleniyor!", canvas.width / 2 - 200, canvas.height / 2);
// // }

// // // Oyuncu odada tek kaldığında
// // canvas.socket.on('userDisconnected', function (data) {
// // 	if (data) {
// // 		clearInterval(intervalID);
// // 		waitingRoom();
// // 	}
// // });

// // // Oyun bitti şampiyonu belirle
// // canvas.socket.on('gameOver', function (data) {
// // 	context.font = "30px 'Press Start 2P', cursive";
// // 	context.fillStyle = "#fff";
// // 	context.fillText("Oyuncu " + data + " Kazandı!", canvas.width / 2 - 250, (3 * canvas.height) / 4);
// // 	var button = document.getElementById("buton-div").querySelector("button");
// // 	button.style.display = "block";
// // 	clearInterval(intervalID);
// // 	scoreOne = 0;
// // 	scoreTwo = 0;
// // });

// // canvas.socket.on('buttonUpdated', function (roomAndColor) {
// // 	console.log("Room:", roomAndColor[0]);
// // 	console.log("Color:", roomAndColor[1]);
// // 	for (var i = 0; i < buttons.length; i++) { // Odaya giriş yapma butonu
// // 		if (buttons[i].innerText == roomAndColor[0]) {
// // 			buttons[i].style.background = buttonColors[roomAndColor[1]];
// // 		}
// // 	}
// // });