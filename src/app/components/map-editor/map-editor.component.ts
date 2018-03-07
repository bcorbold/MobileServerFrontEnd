import {ChangeDetectorRef, Component, Inject} from '@angular/core';
import { Router } from '@angular/router';

import { MessageService } from '../../services/message/message.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'ms-map-editor',
  templateUrl: './map-editor.component.html',
  styleUrls: ['./map-editor.component.scss']
})
export class MapEditorComponent {
  vertexX = 0;
  vertexY = 0;

  lineX1 = 0;
  lineY1 = 0;
  lineX2 = 0;
  lineY2 = 0;

  maxX = 50;
  maxY = 50;

  innerHeight = 50;
  innerWidth = 50;

  constructor(public change: ChangeDetectorRef, private router: Router, private messageService: MessageService, public dialog: MatDialog) {
    messageService.getVerticesAndEdges().then(response => {
      this.vertices = [];
      response.vertices.forEach(vertex => {
        this.vertices.push({
          x: vertex.x,
          y: vertex.y
        });
      });

      this.edges = [];
      response.edges.forEach(edge => {
        let startvertex;
        let endvertex;
        response.vertices.forEach(vertex => {
          if (vertex.name === edge.fromVertex) {
            startvertex = vertex;
          }
          if (vertex.name === edge.toVertex) {
            endvertex = vertex;
          }
        });

        this.edges.push({
          startX: startvertex.x,
          startY: startvertex.y,
          endX: endvertex.x,
          endY: endvertex.y
        });
      });

      this.getMaxX();
      this.getMaxY();

      // document.querySelector('svg').addEventListener('click', event => {
      //   console.log(event);
      // });
    });

    this.innerHeight = (window.innerHeight);
    this.innerWidth = (window.innerWidth);
  }

  vertices = [];
  edges = [];

  getMaxX() {
    let max = 0;
    this.vertices.forEach(num => {
      if (num.x > max) {
        max = num.x;
      }
    });
    this.maxX = max;
  }

  getMaxY() {
    let max = 0;
    this.vertices.forEach(num => {
      if (num.y > max) {
        max = num.y;
      }
    });
    this.maxY = max;
  }

  getMultiplier(): number {
    const height = (this.innerHeight / this.maxY) - 10;
    const width = (this.innerWidth / this.maxX) - 10;

    if (height < width) {
      return height;
    } else {
      return width;
    }
  }

  clickDot(x: number, y: number): void {
    console.log('Got this1' + x);
    console.log('Got this2' + y);
  }

  onClick(event) {
    if (event.srcElement.localName === 'line') {
      this.openDialogLine(
        event.srcElement.getAttribute('actualX1'),
        event.srcElement.getAttribute('actualY1'),
        event.srcElement.getAttribute('actualX2'),
        event.srcElement.getAttribute('actualY2')
      );
    }
    if (event.srcElement.localName === 'circle') {
      this.openDialogCircle(
        event.srcElement.getAttribute('actualX'),
        event.srcElement.getAttribute('actualY')
      );
    }
  }

  openDialogLine(actualX1: number, actualY1: number, actualX2: number, actualY2: number): void {
    const dialogRef = this.dialog.open(PopupDialogComponent, {
      width: '250px',
      data: {
        text: 'Line from (' + actualX1 + ', ' + actualY1 + ') to (' + actualX2 + ', ' + actualY2 + ')'
      }
    });

    dialogRef.afterClosed().subscribe(toDelete => {
      if (toDelete) {
        const newEdges = [];
        this.edges.forEach(edge => {
          if (edge.startX.toString() !== actualX1 || edge.startY.toString() !== actualY1 || edge.endX.toString() !== actualX2 || edge.endY.toString() !== actualY2) {
            newEdges.push(edge);
          }
        });
        this.edges = newEdges;
      }
    });
  }

  openDialogCircle(actualX: number, actualY: number): void {
    const dialogRef = this.dialog.open(PopupDialogComponent, {
      width: '250px',
      data: {
        text: 'vertex at (' + actualX + ', ' + actualY + ')'
      }
    });

    dialogRef.afterClosed().subscribe(toDelete => {
      if (toDelete) {
        const newVertices = [];
        this.vertices.forEach(vertex => {
          if (vertex.x.toString() !== actualX || vertex.y.toString() !== actualY) {
            newVertices.push(vertex);
          }
        });
        this.vertices = newVertices;
      }
    });
  }

  addVertex() {
    this.vertices.push({x: this.vertexX, y: this.vertexY});
  }

  addLine() {
    this.edges.push({
      startX: this.lineX1,
      startY: this.lineY1,
      endX: this.lineX2,
      endY: this.lineY2
    });
    this.change.detectChanges();
  }

  setMap() {
    console.log(this.edges);
    console.log(this.vertices);
    this.messageService.setMap(this.edges, this.vertices);
  }

}

@Component({
  selector: 'ms-popup-dialog-component',
  template: `
    <h1 mat-dialog-title>Would u like to delete the following</h1>
    <div mat-dialog-content>
      <p>{{data.text}}</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button [matDialogClose]="true">Yes</button>
      <button mat-button [matDialogClose]="false" cdkFocusInitial>No</button>
    </div>
  `
})
export class PopupDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<PopupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
