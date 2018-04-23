import { Subject } from 'rxjs/Subject';

import { Edge } from '../../core/edge';

export class CanvasLine {

  strokeStyle = '';

  constructor(private DEFAULT_COLOUR: string,
              private SELECTED_COLOUR: string,
              private fromX: number,
              private fromY: number,
              private toX: number,
              private toY: number,
              private edge: Edge,
              private ctx: CanvasRenderingContext2D,
              aStarResults: Subject<Edge[]>) {

    this.strokeStyle = DEFAULT_COLOUR;
    this.draw();

    aStarResults.subscribe((edges: Edge[]) => {
      this.strokeStyle = this.DEFAULT_COLOUR;

      edges.forEach((newEdge: Edge) => {
        if (this.edge.isSameEdge(newEdge)) {
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

  reset() {
    this.strokeStyle = this.DEFAULT_COLOUR;
    this.draw();
  }
}
