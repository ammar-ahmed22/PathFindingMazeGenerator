import React, { useEffect, useRef, useState, SetStateAction } from "react";
import Cell from "../models/Cell";
import Vec2 from "../models/Vec2";

interface CanvasPropTypes{
    width: number,
    height: number,
    squareSize?: number;
}

const Canvas : React.FC<CanvasPropTypes> = ({ width, height, squareSize }) => {

    const generateCells = (ctx: CanvasRenderingContext2D) : Cell[][] => {
        let size: number = squareSize ? squareSize : 20;
        const cols : number = Math.ceil(width / size);
        const rows : number = Math.ceil(height / size);

        const result : Cell[][] = [];
        for (let row = 0; row < rows; row++){
            const temp : Cell[] = []; 
            for (let col = 0; col < cols; col++){
                const pos = new Vec2(col * size, row * size);

                const cell = new Cell({
                    size,
                    ctx,
                    position: pos,
                    borderColor: "white"
                })

                const startCell = new Cell({
                    size,
                    ctx,
                    position: pos,
                    borderColor: "white",
                    fillColor: "green"
                })

                const endCell = new Cell({
                    size,
                    ctx,
                    position: pos,
                    borderColor: "white",
                    fillColor: "red"
                })

                if (row === 0 && col === 0){
                    temp.push(startCell);
                }else if (row === rows - 1 && col === cols - 1){
                    temp.push(endCell);
                }else{
                    temp.push(cell);
                }

                
            }

            result.push(temp);
        }

        return result;
    }

    useEffect(() => {
        const canvas = document.getElementById("canvas");
        const ctx : CanvasRenderingContext2D | null = canvas instanceof HTMLCanvasElement ? canvas.getContext("2d") : null;

        if (ctx){
            const cells : Cell[][] = generateCells(ctx);

            const setup = () : void => {
                ctx.fillStyle = "black";
                ctx.fillRect(0, 0, width, height);
            }

            const drawCells = (cells: Cell[][]): void => {
                for (let i = 0; i < cells.length; i++){
                    for (let j = 0; j < cells[i].length; j++){
                        cells[i][j].draw();
                    }
                }
            }

            const run = () => {
                setup();
                drawCells(cells);
                requestAnimationFrame(run);
            }

            run();
        }
        

    }, [width, height])
    

    return (
        <canvas width={width} height={height} id="canvas"  ></canvas>
    )
}

export default Canvas;