import { Subject } from 'rxjs/Subject';

export class CustomCircle {
  private radius = 25;
  private fillColor = '#E0F2F1';
  private _isSelected = false;
  private isPartOfPath = false;

  constructor(private x: number,
              private y: number,
              private actualX: number,
              private actualY: number,
              private ctx: CanvasRenderingContext2D,
              clickObservable: Subject<{x: number, y: number}>,
              aStarResults: Subject<{fromX: number, fromY: number, toX: number, toY: number}[]>) {

    this.draw();

    clickObservable.subscribe((vals: {x: number, y: number}) => {
      if (this.checkIfMe(vals.x, vals.y)) {
        if (this._isSelected) {
          this.fillColor = '#E0F2F1';
        } else {
          this.fillColor = '#43A047';
        }
        this.draw();
        this._isSelected = !this._isSelected;
      }
    });

    aStarResults.subscribe((path: {fromX: number, fromY: number, toX: number, toY: number}[]) => {
      path.forEach(edge => {
        if (this.checkIfActualMe(edge.fromX, edge.fromY)) {
          this.isPartOfPath = true;
        } else if (this.checkIfActualMe(edge.toX, edge.toY)) {
          this.isPartOfPath = true;
        }

        if (this.isPartOfPath) {
          this.fillColor = '#43A047';
          this.draw();
        }
      });
    });
  }

  private draw() {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.strokeStyle = '#E0F2F1';
    this.ctx.lineWidth = 2;
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.ctx.fillStyle = this.fillColor;
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.restore();
  }

  private checkIfMe(x: number, y: number): boolean {
    return (
      x > (this.x - this.radius) &&
      x < (this.x + this.radius) &&
      y > (this.y - this.radius) &&
      y < (this.y + this.radius)
    );
  }

  private checkIfActualMe(x: number, y: number): boolean {
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
}
