import { Subject } from 'rxjs/Subject';

export class CustomCircle {
  private radius = 25;
  private fillColor = '';
  private _isSelected = false;

  constructor(private DEFAULT_COLOUR: string,
              private SELECTED_COLOUR: string,
              private x: number,
              private y: number,
              private actualX: number,
              private actualY: number,
              private ctx: CanvasRenderingContext2D,
              clickObservable: Subject<{x: number, y: number}>,
              aStarResults: Subject<{fromX: number, fromY: number, toX: number, toY: number}[]>) {

    this.fillColor = this.DEFAULT_COLOUR;

    this.draw();

    clickObservable.subscribe((vals: {x: number, y: number}) => {
      if (this.isClicked(vals.x, vals.y)) {
        if (this._isSelected) {
          this.fillColor = this.DEFAULT_COLOUR;
        } else {
          this.fillColor = this.SELECTED_COLOUR;
        }
        this.draw();
        this._isSelected = !this._isSelected;
      }
    });

    aStarResults.subscribe((path: {fromX: number, fromY: number, toX: number, toY: number}[]) => {
      this.fillColor = this.DEFAULT_COLOUR;
      path.forEach(edge => {
        if (this.isPartOfPath(edge.fromX, edge.fromY) || this.isPartOfPath(edge.toX, edge.toY)) {
          this.fillColor = this.SELECTED_COLOUR;
        }
      });
      this.draw();
    });
  }

  private draw() {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.strokeStyle = this.DEFAULT_COLOUR;
    this.ctx.lineWidth = 2;
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.ctx.fillStyle = this.fillColor;
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.restore();
  }

  /**
   * This is used to see if the circle has been clicked.
   * Technically this checks a square around the circle atm. Will have to do some more complicated math checks to get the circle only
   * @param {number} x
   * @param {number} y
   * @returns {boolean}
   */
  private isClicked(x: number, y: number): boolean {
    return (
      x > (this.x - this.radius) &&
      x < (this.x + this.radius) &&
      y > (this.y - this.radius) &&
      y < (this.y + this.radius)
    );
  }

  /**
   * This is used to see if the circle (vertex in this context) is part of the path
   * @param {number} x
   * @param {number} y
   * @returns {boolean}
   */
  private isPartOfPath(x: number, y: number): boolean {
    return (x === this.actualX && y === this.actualY);
  }

  public isSelected(): boolean {
    return this._isSelected;
  }

  public getActualXY(): {x: number, y: number} {
    return {
      x: this.actualX,
      y: this.actualY
    };
  }

  public reset() {
    this.fillColor = this.DEFAULT_COLOUR;
    this._isSelected = false;
    this.draw();
  }
}