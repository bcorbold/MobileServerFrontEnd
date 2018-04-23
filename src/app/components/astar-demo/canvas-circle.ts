import { Subject } from 'rxjs/Subject';

import { Edge } from '../../core/edge';
import { Vertex } from '../../core/vertex';

export class CanvasCircle {
  private radius = 25;
  private fillColor = '';
  private _isSelected = false;

  constructor(private DEFAULT_COLOUR: string,
              private SELECTED_COLOUR: string,
              private x: number,
              private y: number,
              private vertex: Vertex,
              private ctx: CanvasRenderingContext2D,
              clickObservable: Subject<{x: number, y: number}>,
              aStarResults: Subject<Edge[]>) {

    this.fillColor = this.DEFAULT_COLOUR;

    this.draw();

    clickObservable.subscribe((clickedCoord: {x: number, y: number}) => {
      if (this.isClicked(clickedCoord.x, clickedCoord.y)) {
        if (this._isSelected) {
          this.fillColor = this.DEFAULT_COLOUR;
        } else {
          this.fillColor = this.SELECTED_COLOUR;
        }
        this.draw();
        this._isSelected = !this._isSelected;
      }
    });

    aStarResults.subscribe((edges: Edge[]) => {
      this.fillColor = this.DEFAULT_COLOUR;
      edges.forEach((edge: Edge) => {
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
    return x === this.vertex.x && y === this.vertex.y;
  }

  public isSelected(): boolean {
    return this._isSelected;
  }

  public getVertex(): Vertex {
    return this.vertex;
  }

  public reset() {
    this.fillColor = this.DEFAULT_COLOUR;
    this._isSelected = false;
    this.draw();
  }
}
