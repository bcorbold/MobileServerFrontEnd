import { AfterViewInit, Component } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Path } from '../../core/path';
import { VerticesAndEdges } from '../../core/vertices-and-edges';
import { MessageService } from '../../services/message/message.service';
import { CustomCircle } from './custom-circle';
import { CustomLine } from './custom-line';

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

    // line canvas stuff
    this.linesCanvas = <HTMLCanvasElement>document.getElementById('linesCnvs');
    this.linesCtx = this.linesCanvas.getContext('2d');

    // circle canvas stuff
    this.circlesCanvas = <HTMLCanvasElement>document.getElementById('circlesCnvs');
    this.circlesCtx = this.circlesCanvas.getContext('2d');

    // add the border to the lines canvas
    this.linesCtx.strokeStyle = this.DEFAULT_COLOUR;
    this.linesCtx.rect(0, 0, this.innerWidth, this.innerHeight);
    this.linesCtx.lineWidth = 2;
    this.linesCtx.stroke();

    // get the map
    this.messageService.getVerticesAndEdges().then(response => {

      const maxXY: {x: number, y: number} = this.getMaxXY(response.vertices);

      // create circle objects
      response.vertices.forEach(vertex => {

        // the +50 and -100 are to offset points from the edges of the canvas
        const circle = new CustomCircle(
          this.DEFAULT_COLOUR,
          this.SELECTED_COLOUR,
          this.scale(vertex.x, this.innerWidth, maxXY.x),
          this.scale(vertex.y, this.innerHeight, maxXY.y),
          vertex.x,
          vertex.y,
          this.circlesCtx,
          this.clickObservable,
          this.aStarResults
        );

        this.circles.push(circle);
      });

      // create line objects
      response.edges.forEach(edge => {
        const line = new CustomLine(
          this.DEFAULT_COLOUR,
          this.SELECTED_COLOUR,
          this.scale(edge.fromX, this.innerWidth, maxXY.x),
          this.scale(edge.fromY, this.innerHeight, maxXY.y),
          this.scale(edge.toX, this.innerWidth, maxXY.x),
          this.scale(edge.toY, this.innerHeight, maxXY.y),
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

  /**
   * Filter for the circles that have been selected and send them to the backend.
   * Also see comment for onClick for {aStarResults} observable shit
   */
  getPath() {
    const vertices = [];
    this.circles.filter(circle => circle.isSelected()).forEach(circle => vertices.push(circle.getActualXY()));
    this.messageService.getPath(vertices).then((response) => {
      this.aStarResults.next(response.path[0].edges);
    });
  }

  /**
   * Filter for the circles that have been selected and send them to the backend.
   */
  getPathWithHistory() {
    const vertices = [];
    this.circles.filter(circle => circle.isSelected()).forEach(circle => vertices.push(circle.getActualXY()));
    this.messageService.getPathWithHistory(vertices).then((response) => {
      this.recursiveLoopThrough(response.path);
    });
  }

  /**
   * Go through all of the paths. Wait for a bit between each one.
   * Also see comment for onClick for {aStarResults} observable shit
   * @param {VerticesAndEdges[]} paths
   */
  recursiveLoopThrough(paths: VerticesAndEdges[]) {
    const path: VerticesAndEdges = paths.shift();
    this.aStarResults.next(path.edges);
    if (paths.length > 0) {
      setTimeout(() => {
        this.recursiveLoopThrough(paths);
      }, 500);
    }
  }

  /**
   * 2 ways this could have gone. I could have looped through all circles here and find which one is clicked, then set it as selected.
   * I opted to just have all of them subscribe to this the click observable. Then they can all just handle there own shit.
   * Not a major reason for doing it this way. Was just tired of looping through everything constantly.
   * @param event
   */
  onClick(event) {
    this.clickObservable.next({x: event.offsetX, y: event.offsetY});
  }

  /**
   * Code equivalent of "Have you tried restarting it?"
   */
  reset() {
    this.circles.forEach(circle => {
      circle.reset();
    });
    this.lines.forEach(line => {
      line.reset();
    });
  }

  /**
   * Self explanatory
   * @param vertices
   * @returns {{x: number; y: number}}
   */
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
