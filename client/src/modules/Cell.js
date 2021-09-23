import { randInt } from "../helpers/random";

class Cell{
    constructor(draw, x, y, size){
        this.draw = draw
        this.x = x;
        this.y = y;
        this.size = size;

        this.neighbours = [];

        this.walls = {
            top: true,
            right: true,
            left: true,
            bottom: true
        }

        this.visited = false;
        this.hightlight = false;

        this.func = 0;
        this.cost = 0;
        this.heuristic = 0;
    }

    //remove walls between this and given cell
    removeWalls = (other) =>{
        // difference in x and y coordinates
        let xDiff = this.x - other.x;
        let yDiff = this.y - other.y;

        // if x coordinate difference is 1, remove left wall, if it's -1 remove right wall
        if (xDiff === 1){
            this.walls.left = false;
            other.walls.right = false;
        } else if (xDiff === -1){
            this.walls.right = false;
            other.walls.left = false;
        }

        // if y coordinate difference is 1, remove top wall, if it's -1 remove bottom wall
        if (yDiff === 1){
            this.walls.top = false;
            other.walls.bottom = false;
        } else if (yDiff === -1){
            this.walls.bottom = false;
            other.walls.top = false;
        }
    }

    // adding all neighbours that are accessible (have no wall between them) to array
    addNeighbours = (grid) => {
        const { x, y } = this;
        if (!this.walls.top){
            this.neighbours.push(grid[y -1][x]);
        }

        if (!this.walls.right){
            this.neighbours.push(grid[y][x+1]);
        }

        if (!this.walls.bottom){
            this.neighbours.push(grid[y + 1][x]);
        }

        if (!this.walls.left){
            this.neighbours.push(grid[y][x - 1]);
        }
    }

    // return a random neighbour that has not already been visitied
    checkNeigbours = (grid) =>{
        let neighbours = []
        const { x, y } = this;

        let top, right, bottom, left;

        if (y > 0){
            top = grid[y - 1][x];
        }
        
        if (x < grid[y].length - 1){
            right = grid[y][x+1];
        }
        
        if (y < grid.length - 1){
            bottom = grid[y + 1][x];
        }
        
        if (x > 0){
            left = grid[y][x - 1];
        }
        

        if (top && !top.visited){
            neighbours.push(top);
        }

        if (right && !right.visited){
            //console.log("has right")
            neighbours.push(right);
        }

        if (left && !left.visited){
            neighbours.push(left);
        }

        if (bottom && !bottom.visited){
            neighbours.push(bottom);
        }

        //console.log(neighbours.length)
        if (neighbours.length > 0){
            let randIndex = randInt(0, neighbours.length - 1);
            //console.log(neighbours[randIndex])
            return neighbours[randIndex];
        }else {
            return undefined;
        }

    }

    // drawing functions
    highlight = () =>{
        const { size } = this;
        const x = this.x * size;
        const y = this.y * size;

        this.draw.setStroke("rgba(0, 0, 0, 0)");
        this.draw.setFill("#c103ff");
        this.draw.rectangle(x, y, size, size);
    }

    show = (fillColor=false, line=false, nextX=null, nextY=null) =>{
        const {size} = this;
        const x = this.x * size;
        const y = this.y * size;
        this.draw.setStroke("#ffffff")
        
        if (!line){
            //top left to top right
            //TOP
            if (this.walls.top){
                this.draw.line(x, y, x+size, y);
            } 
            
            //top right to bottom right
            //RIGHT
            if (this.walls.right){
                this.draw.line(x+size, y, x+size, y+size)
            }
            
            //bottom right to bottom left
            //BOTTOM
            if (this.walls.bottom){
                this.draw.line(x+size, y+size, x, y+size)
            }
        
            //bottom left to top right
            //LEFT
            if (this.walls.left){
                this.draw.line(x, y+size, x, y)
            }
        }
        

        if (this.visited && !fillColor){
            this.draw.setFill("#7b4d8a")
            this.draw.setStroke("rgba(0, 0, 0, 0)")
            this.draw.rectangle(x, y, size, size);
        }

        if (fillColor && !line){
            this.draw.setFill(fillColor);
            this.draw.setStroke("rgba(0, 0, 0, 0)");
            this.draw.rectangle(x, y, size, size);
     
        }

        if (line && fillColor){
            this.draw.setStroke(fillColor);
            this.draw.ctx.lineWidth = this.size / 5;
            this.draw.line(x+(size/2), y+(size/2), nextX+(size/2), nextY+(size/2))
            this.draw.ctx.lineWidth = 1;
        }
        
    }
}

export default Cell