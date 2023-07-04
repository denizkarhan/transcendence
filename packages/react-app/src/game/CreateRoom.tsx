import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateRoom.css'

function CreateRoom() {
	const navigate = useNavigate();
	const [roomName, setRoomName] = useState('');
  
	const handleCreateRoom = () => {
	  // Yeni bir oda oluşturma işlemleri gerçekleştir
	  console.log(roomName);
	  navigate(`/room/${roomName}`);
	};
  
	return (
	  <div>
		<link href="https://fonts.googleapis.com/css?family=Overpass:300,400,400i,700,900" rel="stylesheet" />
		<h1 id="logo">spinup</h1>
		<input type="text" placeholder="Room Code" />
		<button id="join">Join</button><br />
		<button id="create" onClick={handleCreateRoom}>Create Room</button>
	  </div>
	);
  }
  
  export default CreateRoom;