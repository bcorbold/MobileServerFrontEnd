import { Subject } from 'rxjs/Subject';

export class CustomCircle {
  private radius = 25;
  private fillColor = '#E0F2F1';
  private selected = false;

  constructor(private x: number,
              private y: number,
              private ctx: CanvasRenderingContext2D,
              clickObservable: Subject<{x: number, y: number}>) {

    this.draw();

    clickObservable.subscribe((vals: {x: number, y: number}) => {
      if (this.isClicked(vals.x, vals.y)) {
        this.select();
      }
    });
  }

  public draw() {
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

  public isClicked(x: number, y: number): boolean {
    return (
      x > (this.x - this.radius) &&
      x < (this.x + this.radius) &&
      y > (this.y - this.radius) &&
      y < (this.y + this.radius)
    );
  }

  public select() {
    if (this.selected) {
      this.fillColor = '#E0F2F1';
    } else {
      this.fillColor = '#43A047';
    }
    this.draw();
    this.selected = !this.selected;
  }
}
