import React, { useEffect, useRef } from 'react';

const Canvas = ({width, height, cellsArray, onCellClick}) => {
    const cellSize = 10;
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return; // Check if canvas is available
        const context = canvas.getContext('2d');

        for (let i = 0; i < width / cellSize; i++) {
            for (let j = 0; j < height / cellSize; j++) {
                if (cellsArray[i][j] == 0) {
                    context.fillStyle = '#000000';
                } else if (cellsArray[i][j] == 2) {
                    context.fillStyle = '#0000FF';
                } else {
                    context.fillStyle = '#FF0000';
                }
                context.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
            }
        }
    }, [width, height, cellsArray]);

    return <canvas ref={canvasRef} width={width} height={height} onClick={(e) => {
        const rect = canvasRef.current.getBoundingClientRect();
        const x = Math.floor((e.clientX - rect.left) / cellSize);
        const y = Math.floor((e.clientY - rect.top) / cellSize);
        onCellClick(x, y);
    }}/>;
};

export default Canvas;