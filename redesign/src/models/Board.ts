import Cell from "./Cell";
import Vec2 from "./Vec2";

interface BoardParams{
    cols: number,
    rows: number,
    cellSize: number,
    ctx: CanvasRenderingContext2D | null,
    defaultFill?: string,
    defaultStroke?: string
}



class Board{
    public rows : number;
    public cols : number;
    private cellSize : number;
    private ctx : CanvasRenderingContext2D | null;
    private defaultFill : string | undefined;
    private defaultStroke : string | undefined;
    
    public cells : Cell[][] = [];
    constructor(params : BoardParams){
        const { cols, rows, cellSize, ctx, defaultFill, defaultStroke } = params;
        this.cols = cols;
        this.rows = rows;
        this.cellSize = cellSize;
        this.ctx = ctx;
        this.defaultFill = defaultFill;
        this.defaultStroke = defaultStroke;
        this.cells = this.generateCells();
    }

    private generateCells = () : Cell[][] => {
        const { cols, rows, cellSize, ctx, defaultFill, defaultStroke } = this;
        const result : Cell[][] = [];

        for (let row = 0; row < rows; row++){
            const temp : Cell[] = [];
            for (let col = 0; col < cols; col++){
                const cell : Cell = new Cell({
                    size: cellSize,
                    ctx,
                    position: new Vec2(col * cellSize, row * cellSize),
                    fillColor: defaultFill,
                    borderColor: defaultStroke
                });

                temp.push(cell);
            }

            result.push(temp);
        }

        return result;
    }

    public draw = ( ) : void => {
        for (let i = 0; i < this.cells.length; i++){
            for (let j = 0; j < this.cells[i].length; j++){
                
                this.cells[i][j].draw();
            }
        }
    }

}

export default Board;