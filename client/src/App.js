
import './App.css';

import Canvas from './components/Canvas';
import Modal from './components/Modal';
import Controls from './components/Controls';
import Status from './components/Status';
import Instructions from './components/Instructions';

import opening from './assets/jsx/opening';

import * as calculator from "./helpers/calc";

import { useState, useEffect } from 'react';

function App() {
  const h = window.innerHeight;
  const w = window.innerWidth;
  const gridSize = 40;

  const cols = w / gridSize;
  const rows = h / gridSize;




  const [generatingMaze, setGeneratingMaze] = useState(false);
  const [pathFinding, setPathFinding] = useState(false);
  const [mazeGenerated, setMazeGenerated] = useState(false);
  const [pathFound, setPathFound] = useState(false);
  const [searchComplete, setSearchComplete] = useState(false);
  const [modalClosed, setModalClosed] = useState(false);
  const [times, setTimes] = useState({maze : {start: false, end: false}, path: {start: false, end: false}})
  const [nodes, setNodes] = useState({start: {y: 0, x: 0}, end: calculator.calcEndIndex(cols, rows)});
  const [dragging, setDragging ] = useState(false);

  const [id, setId] = useState(0);
  
  //Component Did Mount
  useEffect(()=>{
    setGeneratingMaze(false);
    setPathFinding(false);
    setMazeGenerated(false);
    setPathFound(false);
    setSearchComplete(false);
    setModalClosed(false);
    setTimes({maze: {start: false, end: false}, path: {start: false, end: false}});
    setNodes({start: {y: 0, x: 0}, end: calculator.calcEndIndex(cols, rows)});
    setDragging(false);
  }, [id, cols, rows])

  const appState = {
    generatingMaze,
    setGeneratingMaze,
    pathFinding,
    setPathFinding,
    mazeGenerated,
    setMazeGenerated,
    pathFound,
    setPathFound,
    searchComplete,
    setSearchComplete,
    modalClosed,
    setModalClosed,
    times,
    setTimes,
    nodes,
    setNodes,
    dragging,
    setDragging,
    id,
    setId
  }

  

  

  return (
    <div className="App" key={id}>
      <Canvas width={w} height={h} appState={appState} gridSize={gridSize}/>
      <Status appState={appState} />
      <Controls appState={appState} cols={cols} rows={rows} />
      <Modal appState={appState} contentJsx={opening} closeText="Got it" closeIcon="bx bx-check" identifier="opening-modal" hide={id > 0}/>
      <Instructions /> 
    </div>
  );
}

export default App;
