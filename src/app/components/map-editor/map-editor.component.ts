import {ChangeDetectorRef, Component} from '@angular/core';
import { Router } from '@angular/router';

import { CacheService } from '../../services/cache/cache.service';
import { MessageService } from '../../services/message/message.service';

@Component({
  selector: 'ms-map-editor',
  templateUrl: './map-editor.component.html',
  styleUrls: ['./map-editor.component.scss']
})
export class MapEditorComponent {

  maxX = 50;
  maxY = 50;

  constructor(private router: Router, private messageService: MessageService, private cache: CacheService) {
    messageService.getVerticesAndEdges().then(response => {
      this.vertices = [];
      response.vertices.forEach(vertice => {
        this.vertices.push({
          x: vertice.x * 100,
          y: vertice.y * 100
        });
      });

      this.edges = [];
      response.edges.forEach(edge => {
        console.log(edge);
        console.log(response.vertices);

        let startVertice;
        let endVertice;
        response.vertices.forEach(vertice => {
          console.log(vertice.name);
          console.log(edge.fromVertex);
          console.log(edge.toVertex);
          if (vertice.name === edge.fromVertex) {
            startVertice = vertice;
          }
          if (vertice.name === edge.toVertex) {
            endVertice = vertice;
          }
        });
        console.log(startVertice);
        console.log(endVertice);
        this.edges.push({
          startX: startVertice.x * 100,
          startY: startVertice.y * 100,
          endX: endVertice.x * 100,
          endY: endVertice.y * 100
        });
      });
      console.log(this.edges);

      this.getMaxX();
      this.getMaxY();
    });
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
    this.maxX = max + 20;
  }

  getMaxY() {
    let max = 0;
    this.vertices.forEach(num => {
      if (num.y > max) {
        max = num.y;
      }
    });
    this.maxY = max + 20;
  }

}
