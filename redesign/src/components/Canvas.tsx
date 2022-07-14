import React, { useEffect, useRef, useState, SetStateAction } from "react";
import Cell from "../models/Cell";
import Vec2 from "../models/Vec2";
import Board from "../models/Board";

interface CanvasPropTypes{
    width: number,
    height: number,
    squareSize?: number,
    startColor?: string,
    endColor?: string,
}

const Canvas : React.FC<CanvasPropTypes> = ({ width, height, squareSize, startColor, endColor }) => {

    useEffect(() => {
        const canvas = document.getElementById("canvas");
        const ctx : CanvasRenderingContext2D | null = canvas instanceof HTMLCanvasElement ? canvas.getContext("2d") : null;

        if (ctx){
            const board = new Board({
                cols: Math.ceil(width / (squareSize ? squareSize : 20)),
                rows: Math.ceil(height / (squareSize ? squareSize : 20)),
                cellSize: squareSize ? squareSize : 20,
                ctx,
                defaultFill: "white",
                defaultStroke: "black"
            })
            

            const setup = () : void => {
                ctx.fillStyle = "black";
                ctx.fillRect(0, 0, width, height);
            }


            const run = () => {
                setup();
                if (startColor){
                    board.cells[0][0].setFillColor(startColor);
                }
                
                if (endColor){
                    board.cells[board.rows - 1][board.cols - 1].setFillColor(endColor);
                }
                
                board.draw();
                requestAnimationFrame(run);
            }

            run();
        }
        

    }, [width, height, startColor, endColor])
    

    return (
        <canvas width={width} height={height} id="canvas"  ></canvas>
    )
}

export default Canvas;