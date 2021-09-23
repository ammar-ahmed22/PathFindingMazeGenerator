// helper class for drawing using the canvas API
class Draw{
    constructor(ctx){
        this.ctx = ctx;
    }

    setFill = (fillColor) =>{
        this.ctx.fillStyle = fillColor
    }

    setStroke = (strokeColor) =>{
        this.ctx.strokeStyle = strokeColor
    }

    rectangle = (x, y, width, height, fill=true) => {
        if (fill){
            this.ctx.fillRect(x, y, width, height)
            this.ctx.strokeRect(x, y, width, height)
        }else{
            this.ctx.strokeRect(x, y, width, height)
        }
    }

    circle = (x, y, radius, fill=true) =>{
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, 2*Math.PI)
        if (fill){
            this.ctx.fill();
        }else{
            this.ctx.stroke();
        }

        this.ctx.closePath();
    }

    line = (startX, startY, endX, endY) => {
        this.ctx.beginPath();
        this.ctx.moveTo(startX, startY);
        this.ctx.lineTo(endX, endY);
        this.ctx.stroke();
        this.ctx.closePath();
    }
}

export default Draw;