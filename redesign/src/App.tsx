import './App.css';
import React, { useState, useEffect } from "react";
import Canvas from "./components/Canvas";

const App: React.FC = () => {
  const [w, setW] = useState<number>(window.innerWidth);
  const [h, setH] = useState<number>(window.innerHeight);

  const cellSize : number = 40;
  
  useEffect(() => {
    window.addEventListener("resize", (_e : Event) => {
      setW(window.innerWidth);
      setH(window.innerHeight);
    })
  }, [])
  
  return (
    <div className="App">
      <Canvas width={w} height={h}  squareSize={cellSize} />
    </div>
  );
}

export default App;
