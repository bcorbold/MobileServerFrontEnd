import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { MessageService } from '../../services/message/message.service';

@Component({
  selector: 'ms-map-editor',
  templateUrl: './map-editor.component.html',
  styleUrls: ['./map-editor.component.scss']
})
export class MapEditorComponent {
  vertices = [];
  edges = [];

  maxX = 50;
  maxY = 50;

  innerHeight = 50;
  innerWidth = 50;

  constructor(private router: Router, private messageService: MessageService) {
    messageService.getVerticesAndEdges().then(response => {
      this.vertices = [];
      response.vertices.forEach(vertex => {
        this.vertices.push({
          x: vertex.x,
          y: vertex.y,
          color: 'red'
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
          endY: endvertex.y,
          toVertexName: edge.toVertex,
          fromVertexName: edge.fromVertex,
          color: 'red'
        });
      });

      this.getMaxX();
      this.getMaxY();
    });

    this.innerHeight = (window.innerHeight);
    this.innerWidth = (window.innerWidth);
  }

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

  onClick(event) {

    // cause we dont have direct access to the circle object
    if (event.srcElement.localName === 'circle') {

      // gonna loop through vertices and find the one that i clicked on based on its X and Y
      const newVertices = [];
      this.vertices.forEach(vertex => {
        if (vertex.x.toString() === event.srcElement.getAttribute('actualX')
          && vertex.y.toString() === event.srcElement.getAttribute('actualY')) {

          if (vertex.color === 'red') {
            vertex.color = 'green';
          } else {
            vertex.color = 'red';
          }
          newVertices.push(vertex);
        } else {
          newVertices.push(vertex);
        }
      });
      this.vertices = newVertices;
    }
  }

  getDirections() {

    // loop through the list of vertices and get all the verticies that are blue???
    const newVertices = [];
    this.vertices.forEach(vertex => {
      if (vertex.color === 'green') {
        newVertices.push({
          x: vertex.x,
          y: vertex.y
        });
      }
    });

    this.messageService.useAStar(newVertices).then((response) => {
      const newEdges = [];
      this.edges.forEach(edge => {
        response.edges.forEach(pEdge => {
          if ((pEdge.fromVertex === edge.fromVertexName && pEdge.toVertex === edge.toVertexName)
            || (pEdge.toVertex === edge.fromVertexName && pEdge.fromVertex === edge.toVertexName)) {
            edge.color = 'green';
          }
        });
        newEdges.push(edge);
      });
      this.edges = newEdges;

      const newVertices = [];
      this.vertices.forEach(vertex => {
        response.vertices.forEach(pVertex => {
          if (pVertex.x === vertex.x && pVertex.y === vertex.y) {
            vertex.color = 'green';
          }
        });
        newVertices.push(vertex);
      });
      this.vertices = newVertices;
    });
  }

}
