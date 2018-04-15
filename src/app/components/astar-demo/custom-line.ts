import { Subject } from 'rxjs/Subject';

export class CustomLine {

  strokeStyle = '#E0F2F1';

  constructor(private fromX: number,
              private fromY: number,
              private toX: number,
              private toY: number,
              private actualFromX: number,
              private actualFromY: number,
              private actualToX: number,
              private actualToY: number,
              private ctx: CanvasRenderingContext2D,
              aStarResults: Subject<{fromX: number, fromY: number, toX: number, toY: number}[]>) {

    this.draw();


    aStarResults.subscribe((path: {fromX: number, fromY: number, toX: number, toY: number}[]) => {
      this.strokeStyle = '#E0F2F1';

      path.forEach(edge => {
        if (this.checkIfActualMe(edge.fromX, edge.fromY, edge.toX, edge.toY)) {
          this.strokeStyle = '#43A047';
        }
      });

      this.draw();
    });
  }

  public draw() {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.moveTo(this.fromX, this.fromY);
    this.ctx.strokeStyle = this.strokeStyle;
    this.ctx.lineWidth = 5;
    this.ctx.lineTo(this.toX, this.toY);
    this.ctx.stroke();
    this.ctx.restore();
  }

  private checkIfActualMe(fromX: number, fromY: number, toX: number, toY: number): boolean {
    return (
      fromX === this.actualFromX &&
      fromY === this.actualFromY &&
      toX === this.actualToX &&
      toY === this.actualToY
    ) || (
      toX === this.actualFromX &&
      toY === this.actualFromY &&
      fromX === this.actualToX &&
      fromY === this.actualToY
    );
  }

  reset() {
    this.strokeStyle = '#E0F2F1';
    this.draw();
  }
}
