import React, { Component } from 'react';

import Draw from '../modules/Draw';
import Cell from '../modules/Cell';

import * as calculator from "../helpers/calc";

class Canvas extends Component {

    colors = {
        darkGray: "#454545",
        green: "#198754",
        red: "#dc3545",
        pink: "rgba(193, 3, 255, 1)",
        transpBlue: "rgba(3, 129, 255, 0.5)",
        transpRed: "rgba(255, 3, 16, 0.5)"
    }

    state = {
        mazeComplete: false
    }

    //Height and width of each cell
    size = this.props.gridSize

    //List storing all cells
    grid = [];

    

    //Global for current
    current;

    //Stack
    stack = [];


    //A Star
    //searching
    searching = [];

    //searched
    searched = [];

    //optimal path
    optimalPath = [];

    //no loop
    aStarNoLoop = false;

    //no solution
    aStarNoSolution = false;

    componentDidMount() {
        //Board context
        this.ctx = document.getElementById("canvas").getContext("2d");

        //Drawing helper
        this.draw = new Draw(this.ctx);

        // Maze Setup
        this.mazeSetup()

        
        
        

    }

    // Global variables for if dragging start or end node
    draggingStart = false;
    draggingEnd = false;

    //Handling the mouse moving after holding down
    handleMouseMove = (e) => {
        
        // Nodes that are updated on state of App.js
        const { nodes, setNodes } = this.props.appState;
        
        // Calculating mouses position on the grid
        const mousePos = {x: e.pageX, y: e.pageY};
        const mouseCoords = {x: Math.floor(mousePos.x / this.props.gridSize), y: Math.floor(mousePos.y / this.props.gridSize)};

        
        // If mouse coordinates are the same as start or end nodes, update global
        if (calculator.checkVectorEquality(nodes.start, mouseCoords)){
            this.draggingStart = true;
            
        }else if (calculator.checkVectorEquality(nodes.end, mouseCoords)){
            this.draggingEnd = true;
            
        }

        // If dragging has started and mouse is a new position, set the start node to that position. Same for end node.
        if (this.draggingStart && !calculator.checkVectorEquality(nodes.start, mouseCoords)){
            setNodes( prevState => {
                let copy = {...prevState};
                copy.start = mouseCoords;

                return copy;
            })
        }else if (this.draggingEnd && !calculator.checkVectorEquality(nodes.end, mouseCoords)){
            setNodes( prevState => {
                let copy = {...prevState};
                copy.end = mouseCoords;

                return copy;
            })
        }
    }

    // When holding, add event listener
    handleMouseDown = (e) =>{
        window.addEventListener("mousemove", this.handleMouseMove)
        this.props.appState.setDragging(true);
    }

    //When release, remove event listener (for performance)
    handleMouseUp = (e) =>{
        window.removeEventListener("mousemove", this.handleMouseMove)
        this.props.appState.setDragging(false);
        this.draggingStart = false;
        this.draggingEnd = false;
    }

    //Handling changing cursor on hover of start and end nodes
    handleHover = (e) =>{
        const { nodes } = this.props.appState;
        const canvas = document.getElementById("canvas");
        const mousePos = {x: e.pageX, y: e.pageY};
        const mouseCoords = {x: Math.floor(mousePos.x / this.props.gridSize), y: Math.floor(mousePos.y / this.props.gridSize)};

        if (calculator.checkVectorEquality(nodes.start, mouseCoords)){
            canvas.style.cursor = "grab";
            
        }else if (calculator.checkVectorEquality(nodes.end, mouseCoords)){
            canvas.style.cursor = "grab";
            
        }else{
            canvas.style.cursor = "auto";
        }
    }

    
    // Called when state or props are updated
    componentDidUpdate(prevProps, prevState) {
        const canvas = document.getElementById("canvas");
        //Update loop for maze gen
        // if generating maze changed to true from false, start generating the maze
        if (this.props.appState.generatingMaze && !prevProps.appState.generatingMaze){
            
            this.mazeUpdate();
        }

        // if maze generated is changed to true from false
        if (this.props.appState.mazeGenerated && !prevProps.appState.mazeGenerated){
            
            // set end time for maze generation
            this.props.appState.setTimes( prevState => {
                let newState = {...prevState}
                newState.maze.end = new Date()
                return newState
            })

            
            // add event listeners for holding an releasing mouse
            canvas.addEventListener("mousedown", this.handleMouseDown)
            canvas.addEventListener("mouseup", this.handleMouseUp)
            
        }

        // if the path found is changed from true to false
        if (this.props.appState.pathFound && !prevProps.appState.pathFound){
            // set end time for path finding
            this.props.appState.setTimes( prevState => {
                let newState = {...prevState};
                newState.path.end = new Date();
                return newState
            })
        }
        
        // if maze is generated
        if (this.props.appState.mazeGenerated){
            // adding neighbours for path finding to grid cell objects
            for (let y = 0; y < this.grid.length; y++){
                for (let x = 0; x < this.grid[y].length; x++){
                    this.grid[y][x].addNeighbours(this.grid);
                }
            }

            // add hover event listener 
            canvas.addEventListener("mousemove", this.handleHover)
            const { nodes, dragging } = this.props.appState;

            // if currently dragging, reset and setup pathfinding with nodes, otherwise setup pathfind with default values
            if (dragging){
                this.astarReset()
                this.astarSetup(nodes.start, nodes.end)
            }else{
                this.astarSetup(nodes.start, nodes.end)
            }

            
            // if pathfinding, update pathfinding
            if (this.props.appState.pathFinding){
                this.astarUpdate();
            }
            
            
        }

        
    }
    

    // Canvas setup for maze
    mazeSetup = () =>{

        //Drawing the initial board
        this.draw.setFill(this.colors.darkGray);
        this.draw.rectangle(0, 0, this.props.width, this.props.height)

        //Number of columns and rows based on square size
        this.cols = this.props.width / this.size;
        this.rows = this.props.height / this.size;

        // Intializing 2D array with Cell objects for grid
        for (let y = 0; y < this.rows; y++){
            let temp = [];
            for (let x = 0; x < this.cols; x++){
                temp[x] = new Cell(this.draw, x, y, this.size);

            }
            this.grid.push(temp);
            temp = [];
        }

        

        //start maze generation from top left cell on grid
        this.current = this.grid[0][0];

        //Showing all cells initially
        for (let y = 0; y < this.grid.length; y++){
            for (let x = 0; x < this.grid[y].length; x++){
                this.grid[y][x].show();
            }
        }
    }

    // Update loop
    mazeUpdate = () =>{
        
        //showing cells on each iteration
        for (let y = 0; y < this.grid.length; y++){
            for (let x = 0; x < this.grid[y].length; x++){
                //console.log(this.grid[x[y]])
                this.grid[y][x].show()
            }
        }
        

        this.current.visited  = true;
        this.current.highlight();

        // next is set to a random neighbour of current that can be travelled to (has no wall between them)
        let next = this.current.checkNeigbours(this.grid);
        
        // if next is defined
        if (next){
            next.visited = true;

            //pushing current to the stack
            this.stack.push(this.current);
            
            //remove a random wall from current
            this.current.removeWalls(next);

            //current becomes next for next iteration
            this.current = next;
        } else if (this.stack.length > 0){// if next is not defined (dead-end) and stack has something in it
            //current becomes the last element added to the stack
            this.current = this.stack.pop();
        } else {
            console.log("DONE")
            
            this.props.appState.setMazeGenerated(true)
            return;
        }
            
        
        
        //recursive calling based on frames that browser can handle
        requestAnimationFrame(this.mazeUpdate)
    }

    

    //A Star Setup
    astarSetup = (start, end) =>{

        // start and end nodes for path finding set based on parameters
        this.start = this.grid[start.y][start.x];
        this.end = this.grid[end.y][end.x];
        
        
        //showing the start and nodes visually
        this.start.show(this.colors.green);
        this.end.show(this.colors.red);
        
        //searching array starts off with start node
        this.searching.push(this.start);
    }

    // A Star Reset
    // reseting when start or end is updated
    astarReset = () =>{
        this.start.show();
        this.end.show();
        this.searching = [];
    }

    // A Star update
    astarUpdate = () =>{
        

        let current;
        // if there are cells to search
        if (this.searching.length > 0){

            // Finding the element in searching that has the lowest cumulative cost function
            let leastIndex = 0;
            for (let i = 0; i < this.searching.length; i++){
                if (this.searching[i].func < this.searching[leastIndex].func){
                    leastIndex = i;
                }
            }
            // current becomes element with lowest cumulative cost function
            current = this.searching[leastIndex];

            // if current is end, finished
            if (current === this.end){
                this.aStarNoLoop = true;

                this.props.appState.setSearchComplete(true);
                this.props.appState.setPathFound(true);
                console.log("A STAR DONE")
            }

            //remove current from searching
            this.remove(this.searching, current);
            //push current to searched
            this.searched.push(current);

            //getting all neighbours of current
            const { neighbours } = current;

            //looping through neighbours
            for (let i = 0; i < neighbours.length; i++){
                let neighbour = neighbours[i];

                // if neighbour is not already searched
                if (!this.searched.includes(neighbour)){
                    //tenative cost
                    let tempCost = current.cost + 1;

                    let newPath = false;

                    //neighbour is already in searching
                    if (this.searching.includes(neighbour)){
                        // tentative cost is less than previously assigned cost
                        if (tempCost < neighbour.cost){
                            // assign lower cost to neighbour
                            neighbour.cost = tempCost
                            newPath = true;
                        }
                    } else { //otherwise, assign tenative cost to neighbour
                        neighbour.cost = tempCost;
                        newPath = true;
                        this.searching.push(neighbour);
                    }

                    // assign cumulative cost to neighbour
                    if (newPath){
                        // taxicab distance to end node
                        neighbour.heuristic = this.heuristicCalc(neighbour, this.end);
                        neighbour.func = neighbour.cost + neighbour.heuristic;
                        neighbour.previous = current;
                    }
                }
            }


        }else{
            this.aStarNoLoop = true;
            this.aStarNoSolution = true;
            this.props.appState.setSearchComplete(true);
            console.log("A STAR: NO PATH FOUND")
        }

        
        //showing all cells
        for (let y = 0; y < this.grid.length; y++){
            for (let x = 0; x < this.grid[y].length; x++){
                this.grid[y][x].show();
            }
        }

        //start and nodes stay green and red
        this.start.show(this.colors.green);
        this.end.show(this.colors.red);

        
        // if there is a solution (algorithm completed)
        if (!this.aStarNoSolution){
            //backtrack through linked list to find optimal path
            this.optimalPath = [];

            let temp = current;
            this.optimalPath.push(temp);

            while(temp.previous){
                this.optimalPath.push(temp.previous);

                temp = temp.previous
            }
        }

        //Drawing the optimal path using lines
        for (let i = 0; i < this.optimalPath.length; i++){
            if (this.optimalPath[i+1]){
                this.optimalPath[i].show(this.colors.pink, true, this.optimalPath[i+1].x * this.size, this.optimalPath[i+1].y * this.size);
            }
            
        }

        //As long as we want to continue looping, recursive call
        if (!this.aStarNoLoop){
            window.requestAnimationFrame(this.astarUpdate);
        }
    }

    //heuristic calculation (taxicab distance)
    heuristicCalc = (a, b) =>{
        return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
    }

    //remove an element from a list
    remove = (arr, item) =>{
        for (let i = arr.length - 1; i >= 0; i--){
            if (arr[i] === item){
                //removes on item at the index
                arr.splice(i, 1);
            }
        }
    }
    

    render() {
        return (
            <canvas id="canvas" width={this.props.width} height={this.props.height}></canvas>
        );
    }
}

export default Canvas;
