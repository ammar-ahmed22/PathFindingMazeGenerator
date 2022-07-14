import './App.css';
import React, { useState, useEffect } from "react";
import Canvas from "./components/Canvas";
import { Button, Box } from "@chakra-ui/react";

const App: React.FC = () => {
  const [w, setW] = useState<number>(window.innerWidth);
  const [h, setH] = useState<number>(window.innerHeight);
  const [startColor, setStartColor] = useState<string>("green");
  const [endColor, setEndColor] = useState<string>("red");

  const cellSize : number = 40;
  
  useEffect(() => {
    window.addEventListener("resize", (_e : Event) => {
      setW(window.innerWidth);
      setH(window.innerHeight);
    })
  }, [])
  
  return (
    <Box position="relative" >
      <Canvas width={w} height={h} squareSize={cellSize} startColor={startColor} endColor={endColor} />
      <Button position="absolute" bottom="0" left="50%" transform="translate(-50%, 0)" colorScheme="blue" onClick={() => {
        setStartColor(prev => prev === "green" ? "blue" : "green");
        setEndColor(prev => prev === "red" ? "pink" : "red");
      }}>Test</Button>
    </Box>
  );
}

export default App;
