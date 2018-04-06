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
    // this.reset();
  }

  // find the max x value that is in the list of vertices
  getMaxX() {
    let max = 0;
    this.vertices.forEach(num => {
      if (num.x > max) {
        max = num.x;
      }
    });
    this.maxX = max;
  }

  // find the max y value that is in the list of vertices
  getMaxY() {
    let max = 0;
    this.vertices.forEach(num => {
      if (num.y > max) {
        max = num.y;
      }
    });
    this.maxY = max;
  }

  /**
   * We have a bunch of vertices. We need to scale the svg based on the largest vertex value
   * A lot of this was playing with numbers until i found one that worked
   * @returns {number}
   */
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

          vertex.selected = !vertex.selected;

          newVertices.push(vertex);
        } else {
          newVertices.push(vertex);
        }
      });
      this.vertices = newVertices;
    }
  }

  getDirections() {

    // loop through the list of vertices and get all the vertices that are green
    const newVertices = [];
    this.vertices.forEach(vertex => {
      if (vertex.selected) {
        newVertices.push({
          x: vertex.x,
          y: vertex.y
        });
      }
    });

    /*
     * Gonna loop through my edges and vertices lists
     * If the edge or vertices that I am on is in my AStar return then change my color
     */
    // this.messageService.useAStar(newVertices).then((response) => {
    //   const newEdges = [];
    //   this.edges.forEach(edge => {
    //     response.edges.forEach(pEdge => {
    //       if ((pEdge.fromVertex === edge.fromVertexName && pEdge.toVertex === edge.toVertexName)
    //         || (pEdge.toVertex === edge.fromVertexName && pEdge.fromVertex === edge.toVertexName)) {
    //         edge.selected = true;
    //       }
    //     });
    //     newEdges.push(edge);
    //   });
    //   this.edges = newEdges;
    //
    //   const newVertices = [];
    //   this.vertices.forEach(vertex => {
    //     response.vertices.forEach(pVertex => {
    //       if (pVertex.x === vertex.x && pVertex.y === vertex.y) {
    //         vertex.selected = true;
    //       }
    //     });
    //     newVertices.push(vertex);
    //   });
    //   this.vertices = newVertices;
    // });
  }

  /**
   * Put this into its own function so that it can be called by a button to reset everything
  //  */
  // reset() {
  //   this.messageService.getVerticesAndEdges().then(response => {
  //     this.vertices = [];
  //     response.vertices.forEach(vertex => {
  //       this.vertices.push({
  //         x: vertex.x,
  //         y: vertex.y,
  //         selected: false
  //       });
  //     });
  //
  //     this.edges = [];
  //     response.edges.forEach(edge => {
  //       let startvertex;
  //       let endvertex;
  //       response.vertices.forEach(vertex => {
  //         if (vertex.name === edge.fromVertex) {
  //           startvertex = vertex;
  //         }
  //         if (vertex.name === edge.toVertex) {
  //           endvertex = vertex;
  //         }
  //       });
  //
  //       this.edges.push({
  //         startX: startvertex.x,
  //         startY: startvertex.y,
  //         endX: endvertex.x,
  //         endY: endvertex.y,
  //         toVertexName: edge.toVertex,
  //         fromVertexName: edge.fromVertex,
  //         selected: false
  //       });
  //     });
  //
  //     this.getMaxX();
  //     this.getMaxY();
  //   });
  //
  //   this.innerHeight = (window.innerHeight);
  //   this.innerWidth = (window.innerWidth);
  // }
}
