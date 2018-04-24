import { AfterViewInit, Component } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { MatSnackBar } from '@angular/material';
import { Edge } from '../../core/edge';
import { LocationMap } from '../../core/location-map';
import { Vertex } from '../../core/vertex';
import { MessageService } from '../../services/message/message.service';
import { CanvasCircle } from './canvas-circle';
import { CanvasLine } from './canvas-line';

@Component({
  selector: 'ms-path-finding-demo',
  templateUrl: './path-finding-demo.component.html',
  styleUrls: ['./path-finding-demo.component.scss']
})
export class PathFindingDemoComponent implements AfterViewInit {
  DEFAULT_COLOUR = '#E0F2F1';
  SELECTED_COLOUR = '#43A047';

  innerHeight = 100;
  innerWidth = 100;

  circles: CanvasCircle[] = [];
  lines: CanvasLine[] = [];

  linesCanvas: HTMLCanvasElement;
  linesCtx: CanvasRenderingContext2D;

  circlesCanvas: HTMLCanvasElement;
  circlesCtx: CanvasRenderingContext2D;

  clickObservable = new Subject<{x: number, y: number}>();
  aStarResults = new Subject<Edge[]>();

  constructor(private messageService: MessageService, private snackBar: MatSnackBar) {
    this.innerHeight = window.innerHeight - 50;
    this.innerWidth = window.innerWidth - 350;
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
    this.messageService.getMap()
      .then((map: LocationMap) => {
        const maxXY: {x: number, y: number} = this.getMaxXY(map.vertices);

        // create circle objects
        map.vertices.forEach(vertex => {
          // the +50 and -100 are to offset points from the edges of the canvas
          const circle = new CanvasCircle(
            this.DEFAULT_COLOUR,
            this.SELECTED_COLOUR,
            this.scale(vertex.xposition, this.innerWidth, maxXY.x),
            this.scale(vertex.yposition, this.innerHeight, maxXY.y),
            vertex,
            this.circlesCtx,
            this.clickObservable,
            this.aStarResults
          );
          this.circles.push(circle);
        });

        // create line objects
        map.edges.forEach(edge => {
          const line = new CanvasLine(
            this.DEFAULT_COLOUR,
            this.SELECTED_COLOUR,
            this.scale(edge.source.xposition, this.innerWidth, maxXY.x),
            this.scale(edge.source.yposition, this.innerHeight, maxXY.y),
            this.scale(edge.destination.xposition, this.innerWidth, maxXY.x),
            this.scale(edge.destination.yposition, this.innerHeight, maxXY.y),
            edge,
            this.linesCtx,
            this.aStarResults
          );
          this.lines.push(line);
        });
      })
      .catch(err => {
        this.snackBar.open('Encountered an error while fetching the map.', 'Dismiss', {
          duration: 30000,
          panelClass: 'mat-snack-bar-error'
        });
      });
  }

  /**
   * Filter for the circles that have been selected and send them to the backend.
   * Also see comment for onClick for {aStarResults} observable shit
   */
  getPath() {
    const vertices = [];
    this.circles
      .filter((circle: CanvasCircle) => circle.isSelected())
      .forEach((circle: CanvasCircle) => vertices.push(circle.getVertex()));
    this.messageService.getPath(vertices)
      .then((edges: Edge[]) => this.aStarResults.next(edges))
      .catch(err => {
        this.snackBar.open('Encountered an error while trying to get the path.', 'Dismiss', {
          duration: 30000,
          panelClass: 'mat-snack-bar-error'
        });
      });
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
    this.circles.forEach((circle: CanvasCircle) => circle.reset());
    this.lines.forEach((line: CanvasLine) => line.reset());
  }

  /**
   * Self explanatory
   * @param vertices
   * @returns {{x: number; y: number}}
   */
  getMaxXY(vertices: Vertex[]): {x: number, y: number} {
    let maxX = 0;
    let maxY = 0;
    vertices.forEach((vertex: Vertex) => {
      if (vertex.xposition > maxX) {
        maxX = vertex.xposition;
      }

      if (vertex.yposition > maxY) {
        maxY = vertex.yposition;
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
