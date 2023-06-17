import { useEffect, useRef } from "react";

const Canvas = () =>{
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(()=>{
        const canvas = canvasRef.current;
        if(!canvas)
            return;
        const context = canvas.getContext('2d');
        if(!context)
            return;
            console.log(canvas);
        context.fillStyle = 'blue';
        context.fillRect(0,0,100,100);
    },[])
    
    return <canvas ref={canvasRef}/>;
};

export default Canvas;