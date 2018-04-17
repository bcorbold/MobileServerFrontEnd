import { Subject } from 'rxjs/Subject';

export class CustomLine {

  strokeStyle = '';

  constructor(private DEFAULT_COLOUR: string,
              private SELECTED_COLOUR: string,
              private fromX: number,
              private fromY: number,
              private toX: number,
              private toY: number,
              private actualFromX: number,
              private actualFromY: number,
              private actualToX: number,
              private actualToY: number,
              private ctx: CanvasRenderingContext2D,
              aStarResults: Subject<{fromX: number, fromY: number, toX: number, toY: number}[]>) {

    this.strokeStyle = DEFAULT_COLOUR;

    this.draw();


    aStarResults.subscribe((path: {fromX: number, fromY: number, toX: number, toY: number}[]) => {
      this.strokeStyle = this.DEFAULT_COLOUR;

      path.forEach(edge => {
        if (this.isPartOfPath(edge.fromX, edge.fromY, edge.toX, edge.toY)) {
          this.strokeStyle = this.SELECTED_COLOUR;
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

  /**
   * Check to see if the line is part of the path
   * @param {number} fromX
   * @param {number} fromY
   * @param {number} toX
   * @param {number} toY
   * @returns {boolean}
   */
  private isPartOfPath(fromX: number, fromY: number, toX: number, toY: number): boolean {
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
    this.strokeStyle = this.DEFAULT_COLOUR;
    this.draw();
  }
}
