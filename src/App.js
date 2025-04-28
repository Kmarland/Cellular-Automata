import React, { useState, useEffect } from 'react';
import Canvas from './Canvas';
import './App.css';

const App = () => {
    const cellSize = 10;
    const width = 1500;
    const height = 500;
    const cellsWidth = width / cellSize;
    const cellsHeight= height / cellSize;
    const cellsArray = []
    for (let i = 0; i < cellsWidth; i++) {
        cellsArray[i] = []
        for (let j = 0; j < cellsHeight; j++) {
            cellsArray[i][j] = 0;
        }
    }
    const [cells, setCells] = useState(cellsArray); // Your cellular automata grid
    const [generation, setGeneration] = useState(0);
    const [isPaused, setIsPaused] = useState(true);
    const [version, setVersion] = useState(0);

    const updateCells = () => {
        const newCells = cells.map(row => [...row]);
        for (let i = cellsWidth - 1; i >= 0; i--) {
            for (let j = 0; j < cellsHeight; j++) {
                let numLive = 0;
                const neighbors = getMooreNeighborhood(i, j);
                for (let k = 0; k < neighbors.length; k++) {
                    if (neighbors[k] == 1) {
                        numLive++;
                    }
                }
                if (version == 0) {
                    if (cells[i][j] == 1) {
                        if (numLive < 2 || numLive > 3) {
                            newCells[i][j] = 0;
                        }
                    } else {
                        if (numLive == 3) {
                            newCells[i][j] = 1;
                        }
                    }
                } else if (version == 1){
                    if (cells[i][j] == 1) {
                        newCells[i][j] = 2
                    } else if (cells[i][j] == 2){
                        newCells[i][j] = 0
                    } else {
                        if (numLive == 2) {
                            newCells[i][j] = 1;
                        }
                    }
                } else {
                    if (cells[i][j] == 1) {
                        newCells[i][j] = 0
                    } else {
                        if (numLive == 2) {
                            newCells[i][j] = 1;
                        }
                    }
                }
            }
        }
        return newCells;
    };

    function getMooreNeighborhood(x, y) {
        let neighborhood = [];
        let prevx = x - 1 == -1 ? cellsWidth - 1 : x - 1;
        let postx = x + 1 >= cellsWidth ? 0 : x + 1;
        let prevy = y - 1 == -1 ? cellsHeight - 1 : y - 1;
        let posty = y + 1 >= cellsHeight ? 0 : y + 1;
        neighborhood[0] = getCell(prevx, prevy);
        neighborhood[1] = getCell(prevx, y);
        neighborhood[2] = getCell(prevx, posty);
        neighborhood[3] = getCell(x, prevy);
        neighborhood[4] = getCell(x, posty);
        neighborhood[5] = getCell(postx, prevy);
        neighborhood[6] = getCell(postx, y);
        neighborhood[7] = getCell(postx, posty);
        return neighborhood;
    }

    function getCell(x, y) {
        return cells[x][y];
    }

    useEffect(() => {
        let intervalID;
        if (!isPaused) {
            intervalID = setInterval(() => {
                const temp = updateCells();
                setCells(temp);
                setGeneration(generation + 1);
            }, 10);
        }

        return () => clearInterval(intervalID)
    }, [generation, isPaused])

    const handleCellClick = (x, y) => {
        const newCells = [...cells];
        newCells[x][y] = newCells[x][y] == 0 ? 1 : 0;
        /*
        const neighborhood = [];
        let prevx = x - 1 === -1 ? cellsWidth - 1 : x - 1;
        let postx = x + 1 >= cellsWidth ? 0 : x + 1;
        let prevy = y - 1 === -1 ? cellsHeight - 1 : y - 1;
        let posty = y + 1 >= cellsHeight ? 0 : y + 1;
        newCells[prevx][prevy] = 2;
        newCells[prevx][y] = 2;
        newCells[prevx][posty] = 2;
        newCells[x][prevy] = 2;
        newCells[x][posty] = 2;
        newCells[postx][prevy] = 2;
        newCells[postx][y] = 2;
        newCells[postx][posty] = 2;
        */
        setCells(newCells);
    };

    const handlePause = () => {
        setIsPaused(!isPaused);
    }

    return (
        <div className="app">
            <h1>Cellular Automata Simulator</h1>
            <Canvas width={width} height={height} cellsArray={cells} id="canvas" onCellClick={handleCellClick}/>
            <p>Generation: {generation}</p>
            <button onClick={handlePause}>Pause</button>
            <button onClick={() => {
                setVersion(version + 1 == 3 ? 0 : version + 1);
            }}>Next</button>
        </div>
        );
};

export default App;
