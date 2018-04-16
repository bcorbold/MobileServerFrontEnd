import { AfterViewInit, Component } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { CustomCircle } from './custom-circle';
import { MessageService } from '../../services/message/message.service';
import { CustomLine } from './custom-line';
import { Path } from '../../core/path';
import { VerticesAndEdges } from '../../core/vertices-and-edges';

@Component({
  selector: 'ms-astar-demo',
  templateUrl: './astar-demo.component.html',
  styleUrls: ['./astar-demo.component.scss']
})
export class AStarDemoComponent implements AfterViewInit {
  DEFAULT_COLOUR = '#E0F2F1';
  SELECTED_COLOUR = '#43A047';

  innerHeight = 100;
  innerWidth = 100;

  circles = [];
  lines = [];

  linesCanvas: HTMLCanvasElement;
  linesCtx: CanvasRenderingContext2D;

  circlesCanvas: HTMLCanvasElement;
  circlesCtx: CanvasRenderingContext2D;

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
    this.linesCanvas = <HTMLCanvasElement>document.getElementById('linesCnvs');
    this.linesCtx = this.linesCanvas.getContext('2d');

    this.circlesCanvas = <HTMLCanvasElement>document.getElementById('circlesCnvs');
    this.circlesCtx = this.circlesCanvas.getContext('2d');

    this.linesCtx.strokeStyle = this.DEFAULT_COLOUR;
    this.linesCtx.rect(0, 0, this.innerWidth, this.innerHeight);
    this.linesCtx.lineWidth = 2;
    this.linesCtx.stroke();

    this.messageService.getVerticesAndEdges().then(response => {

      const maxXY: {x: number, y: number} = this.getMaxXY(response.vertices);

      response.vertices.forEach(vertex => {

        // the +50 and -100 are to offset points from the edges of the canvas
        const circle = new CustomCircle(
          this.DEFAULT_COLOUR,
          this.SELECTED_COLOUR,
          vertex.x * ((this.innerWidth - 100) / maxXY.x) + 50,
          vertex.y * ((this.innerHeight - 100) / maxXY.y) + 50,
          vertex.x,
          vertex.y,
          this.circlesCtx,
          this.clickObservable,
          this.aStarResults
        );

        this.circles.push(circle);
      });

      response.edges.forEach(edge => {
        const line = new CustomLine(
          this.DEFAULT_COLOUR,
          this.SELECTED_COLOUR,
        edge.fromX * ((this.innerWidth - 100) / maxXY.x) + 50,
          edge.fromY * ((this.innerHeight - 100) / maxXY.y) + 50,
          edge.toX * ((this.innerWidth - 100) / maxXY.x) + 50,
          edge.toY * ((this.innerHeight - 100) / maxXY.y) + 50,
          edge.fromX,
          edge.fromY,
          edge.toX,
          edge.toY,
          this.linesCtx,
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
      }, 500);
    }
  }

  onClick(event) {
    this.clickObservable.next({x: event.offsetX, y: event.offsetY});
  }

  reset() {
    this.circles.forEach(circle => {
      circle.reset();
    });
    this.lines.forEach(line => {
      line.reset();
    });
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

  /**
   * Scale up the X or Y value so that we use up the entire screen
   * @param {number} originalValue - This is the X or Y value
   * @param {number} maxNewValue - The inner height or width. Dont want value to be bigger than screen. Will make scroll bars. So nahh
   * @param {number} largestValue - Max X or Y value in list. A divisor used for scaling
   * @returns {number} A scaled up value of X or Y
   */
  scale(originalValue: number, maxNewValue: number, largestValue: number): number {
    return originalValue * ((maxNewValue - 100) / largestValue) + 50;
  }
}
