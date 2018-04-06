import { AfterViewInit, Component } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { CustomCircle } from './custom-circle';
import { MessageService } from '../../services/message/message.service';
import {CustomLine} from './custom-line';

@Component({
  selector: 'ms-astar-demo',
  templateUrl: './astar-demo.component.html',
  styleUrls: ['./astar-demo.component.scss']
})
export class AStarDemoComponent implements AfterViewInit {
  innerHeight = 100;
  innerWidth = 100;

  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  clickObservable = new Subject<{x: number, y: number}>();
  edges = [];
  vertices = [];

  constructor(private messageService: MessageService) {
    this.innerHeight = (window.innerHeight) - 50;
    this.innerWidth = (window.innerWidth) - 50;
  }

  ngAfterViewInit() {
    this.canvas = <HTMLCanvasElement>document.getElementById('cnvs');
    this.ctx = this.canvas.getContext('2d');

    this.ctx.strokeStyle = '#E0F2F1';
    this.ctx.rect(0, 0, this.innerWidth, this.innerHeight);
    this.ctx.lineWidth = 2;
    this.ctx.stroke();

    this.messageService.getVerticesAndEdges().then(response => {
      this.edges = response.edges;
      this.vertices = response.vertices;

      const maxXY: {x: number, y: number} = this.getMaxXY();

      this.vertices.forEach(vertex => {

        // the +50 and -100 are to offset points from the edges of the canvas
        const circle = new CustomCircle(
          vertex.x * ((this.innerWidth - 100) / maxXY.x) + 50,
          vertex.y * ((this.innerHeight - 100) / maxXY.y) + 50,
          this.ctx,
          this.clickObservable
        );
      });

      this.edges.forEach(edge => {
        const line = new CustomLine(
          edge.fromX * ((this.innerWidth - 100) / maxXY.x) + 50,
          edge.fromY * ((this.innerHeight - 100) / maxXY.y) + 50,
          edge.toX * ((this.innerWidth - 100) / maxXY.x) + 50,
          edge.toY * ((this.innerHeight - 100) / maxXY.y) + 50,
          this.ctx
        );
      });

      console.log(response.vertices);
      console.log(response.edges);
    });
  }

  onClick(event) {
    this.clickObservable.next({x: event.offsetX, y: event.offsetY});
  }

  getMaxXY(): {x: number, y: number} {
    let maxX = 0;
    let maxY = 0;
    this.vertices.forEach(vertex => {
      if (vertex.x > maxX) {
        maxX = vertex.x;
      }

      if (vertex.y > maxY) {
        maxY = vertex.y;
      }
    });
    return {x: maxX, y: maxY};
  }
}
