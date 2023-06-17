import io, { Socket } from 'socket.io-client';
import { getCookie } from "../api";
import React, { useEffect, useRef } from "react";

class Eleman {
  // Eleman sınıfı kodları...
}

const Game = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const styleRef = useRef<HTMLCanvasElement>(null);
  const buttonsRef = useRef<HTMLButtonElement[]>([]);
  const randomButtonRef = useRef<HTMLButtonElement>(null);
  const textContainerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    const style = styleRef.current;
    const buttons = buttonsRef.current;
    const randomButton = randomButtonRef.current;
    const textContainer = textContainerRef.current;

    if (!canvas || !context || !style || !buttons || !randomButton || !textContainer) {
      return;
    }

    // Kodun geri kalanı...
  }, []);

  return (
    <canvas ref={canvasRef}></canvas>
  );
};

export default Game;
