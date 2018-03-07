import { Coordinate } from './coordinate';
import { DeliveryLocation } from './delivery-location';

export class VerticesAndEdges {
  vertices: {
    x: number,
    y: number,
    name: string
  }[];
  edges: {
    toVertex: string,
    fromVertex: string,
    cost: number
  }[];

  constructor(that: VerticesAndEdges) {
    this.vertices = that.vertices;
    this.edges = that.edges;
  }

}
