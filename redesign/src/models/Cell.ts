import Vec2 from "./Vec2";

interface CellParams{
    ctx: CanvasRenderingContext2D | null,
    size: number,
    position: Vec2,
    borderColor?: string,
    fillColor?: string
}

interface DrawParams{
    borderColor?: string,
    fillColor?: string,
}

class Cell{
    private ctx : CanvasRenderingContext2D | null;
    public size : number;
    public position: Vec2;
    public borderColor: string | undefined;
    public fillColor: string | undefined;
    constructor(params : CellParams){
        
        this.ctx = params.ctx;
        this.size = params.size;
        this.position = params.position;
        this.borderColor = params.borderColor;
        this.fillColor = params.fillColor
        
    }

    public setBorderColor = (color: string): void => {
        this.borderColor = color;
    }

    public setFillColor = (color: string) : void => {
        this.fillColor = color;
    }

    public setSize = (size : number) : void => {
        this.size = size;
    }

    public setPosition = (pos: Vec2) : void => {
        this.position = pos;
    }

    public draw = () : void => {
        // let { borderColor, fillColor } = params;
        const { ctx, position, size, borderColor, fillColor } = this;

        if (ctx){
            if (borderColor && fillColor){
                ctx.fillStyle = fillColor;
                ctx.fillRect(position.x, position.y, size, size);
    
                ctx.strokeStyle = borderColor;
                ctx.strokeRect(position.x, position.y, size, size);
    
            }else if (borderColor){
                ctx.strokeStyle = borderColor;
                ctx.strokeRect(position.x, position.y, size, size);
            }else if (fillColor){
                ctx.fillStyle = fillColor;
                ctx.fillRect(position.x, position.y, size, size);
            }else{
                // Default
                ctx.fillStyle = "black";
                ctx.fillRect(position.x, position.y, size, size);
    
                ctx.strokeStyle = "white";
                ctx.strokeRect(position.x, position.y, size, size);
            }
        }
        
    }

}

export default Cell;

