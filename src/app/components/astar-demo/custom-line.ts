export class CustomLine {

  constructor(private fromX: number,
              private fromY: number,
              private toX: number,
              private toY: number,
              private actualFromX: number,
              private actualFromY: number,
              private actualToX: number,
              private actualToY: number,
              private ctx: CanvasRenderingContext2D) {

    this.draw();
  }

  public draw() {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.moveTo(this.fromX, this.fromY);
    this.ctx.strokeStyle = '#E0F2F1';
    this.ctx.lineWidth = 2;
    this.ctx.lineTo(this.toX, this.toY);
    this.ctx.stroke();
    this.ctx.restore();
  }
}
