import { AfterViewInit, Component } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { CustomCircle } from './custom-circle';
import { MessageService } from '../../services/message/message.service';
import { CustomLine } from './custom-line';
import {Path} from '../../core/path';
import {VerticesAndEdges} from '../../core/vertices-and-edges';

@Component({
  selector: 'ms-astar-demo',
  templateUrl: './astar-demo.component.html',
  styleUrls: ['./astar-demo.component.scss']
})
export class AStarDemoComponent implements AfterViewInit {
  innerHeight = 100;
  innerWidth = 100;

  circles = [];
  lines = [];

  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  clickObservable = new Subject<{x: number, y: number}>();
  aStarResults = new Subject<{
    fromX: number,
    fromY: number,
    toX: number,
    toY: number
  }[]>();

  constructor(private messageService: MessageService) {
    this.innerHeight = (window.innerHeight) - 50;
    this.innerWidth = (window.innerWidth) - 350;
  }

  ngAfterViewInit() {

    // get the objects we will use for the canvas
    this.canvas = <HTMLCanvasElement>document.getElementById('cnvs');
    this.ctx = this.canvas.getContext('2d');

    this.ctx.strokeStyle = '#E0F2F1';
    this.ctx.rect(0, 0, this.innerWidth, this.innerHeight);
    this.ctx.lineWidth = 2;
    this.ctx.stroke();

    this.messageService.getVerticesAndEdges().then(response => {

      const maxXY: {x: number, y: number} = this.getMaxXY(response.vertices);

      response.vertices.forEach(vertex => {

        // the +50 and -100 are to offset points from the edges of the canvas
        const circle = new CustomCircle(
          vertex.x * ((this.innerWidth - 100) / maxXY.x) + 50,
          vertex.y * ((this.innerHeight - 100) / maxXY.y) + 50,
          vertex.x,
          vertex.y,
          this.ctx,
          this.clickObservable,
          this.aStarResults
        );

        this.circles.push(circle);
      });

      response.edges.forEach(edge => {
        const line = new CustomLine(
          edge.fromX * ((this.innerWidth - 100) / maxXY.x) + 50,
          edge.fromY * ((this.innerHeight - 100) / maxXY.y) + 50,
          edge.toX * ((this.innerWidth - 100) / maxXY.x) + 50,
          edge.toY * ((this.innerHeight - 100) / maxXY.y) + 50,
          edge.fromX,
          edge.fromY,
          edge.toX,
          edge.toY,
          this.ctx,
          this.aStarResults
        );

        this.lines.push(line);
      });
    });
  }

  getPath() {
    const vertices = [];
    this.circles.filter(circle => circle.isSelected()).forEach(circle => vertices.push(circle.getActualXY()));
    this.messageService.getPath(vertices).then((response) => {
      this.aStarResults.next(response.path[0].edges);
    });
  }

  getPathWithHistory() {
    const vertices = [];
    this.circles.filter(circle => circle.isSelected()).forEach(circle => vertices.push(circle.getActualXY()));
    this.messageService.getPathWithHistory(vertices).then((response) => {
      console.log(Path.copy(response));
      this.recursiveLoopThrough(response.path);
    });
  }

  recursiveLoopThrough(paths: VerticesAndEdges[]) {
    const path: VerticesAndEdges = paths.shift();
    this.aStarResults.next(path.edges);
    if (paths.length > 0) {
      setTimeout(() => {
        this.recursiveLoopThrough(paths);
      }, 1000);
    }
  }

  onClick(event) {
    this.clickObservable.next({x: event.offsetX, y: event.offsetY});
  }

  getMaxXY(vertices): {x: number, y: number} {
    let maxX = 0;
    let maxY = 0;
    vertices.forEach(vertex => {
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
