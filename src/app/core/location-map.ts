import { Edge } from './edge';
import { Vertex } from './vertex';

export class LocationMap {
  vertices: Vertex[];
  edges: Edge[];

  constructor() {
    this.vertices = [];
    this.edges = [];
  }

}
