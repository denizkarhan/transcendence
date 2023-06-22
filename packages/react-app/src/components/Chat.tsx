import React, { useEffect } from 'react';
import io from 'socket.io-client';

const ChatComponent = () => {
	useEffect(() => {
		const socket = io('http://localhost:3001'); // Chat sunucusunun URL'sini uygun şekilde güncelleyin

		// Socket.io üzerinden chat mesajlarını dinleyin
		socket.on('chatMessage', (message: any) => {
			console.log('Gelen mesaj:', message);
			// Gelen mesajı işleyin veya görüntüleyin
		});

		// Chat mesajını sunucuya göndermek için bir fonksiyon oluşturun
		const sendChatMessage = (message: any) => {
			socket.emit('chatMessage', message);
		};

		// Chat mesajı göndermek için bir örnek
		sendChatMessage('Merhaba, nasılsınız?');

		// Component kaldırıldığında soket bağlantısını kapatın
		return () => {
			socket.disconnect();
		};
	}, []);


	return (
		<div>
			{/* Chat bileşeni içeriği */}
		</div>
	);
};

export default ChatComponent;