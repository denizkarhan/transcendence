function Room(props: any) {
	const { roomId } = props.match.params;
  
	return (
	  <div>
		<h2>Room: {roomId}</h2>
		{/* Oda içeriği */}
	  </div>
	);
  }
  
  export default Room;