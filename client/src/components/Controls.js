import React, { Component } from 'react';
import "../assets/css/controls.css";

class Controls extends Component {

    
    
    
    handleGenerate = e =>{
        this.props.appState.setGeneratingMaze(true);
        this.props.appState.setTimes( prevState => {
                let newState = {...prevState};
                newState.maze.start = new Date();
                return newState
            })
    }

    handlePathFind = e =>{
        this.props.appState.setPathFinding(true);
        this.props.appState.setTimes ( prevState => {
            let newState = {...prevState};
            newState.path.start = new Date();
            return newState
        })
    }

    handleReset = e =>{
        this.props.appState.setId( prevState => {
            return prevState + 1;
        })
    }

    componentDidUpdate(prevProps, prevState) {

        const controlBtns = document.querySelectorAll(".ctrl-btn");

        const controls = document.querySelector(".controls");
        const status = document.querySelector(".status");

        const { mazeGenerated, generatingMaze, pathFinding, canvasClickCount } = this.props.appState;
        if (mazeGenerated && !prevProps.appState.mazeGenerated){
            controlBtns.forEach( item => {
                if (item.textContent === "Generate Maze" && !item.classList.contains("disabled")){
                    item.classList.add("disabled");
                }else if (item.textContent === "Find Path"){
                    item.classList.remove("disabled");
                }
            })
        }

        if (generatingMaze && !prevProps.appState.generatingMaze) {
            controlBtns.forEach( item => {
                if (item.textContent === "Generate Maze"){
                    item.classList.add("disabled");
                }
            })
        }

        if (pathFinding && !prevProps.appState.pathFinding){
            controlBtns.forEach( item => {
                if (item.textContent === "Find Path" || item.textContent === "Set Start/End"){
                    item.classList.add("disabled");
                }
            })
        }

        
        
        
    }

    
    

    render() {
        return (
            <div className="controls p-3">
                <button className="btn btn-pink ctrl-btn" onClick={this.handleGenerate}>Generate Maze</button>
                <button className="btn btn-pink disabled ctrl-btn" onClick={this.handlePathFind}>Find Path</button>
                <button className="btn btn-pink ctrl-btn" onClick={this.handleReset}><i class='bx bx-refresh'></i></button>
                
            </div>
        );
    }
}

export default Controls;
