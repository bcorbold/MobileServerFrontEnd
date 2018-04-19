import { AddOn } from './add-on';
import { OrderOption } from './order-option';

export class VerticesAndEdges {
  vertices: {
    x: number,
    y: number
  }[];
  edges: {
    fromX: number,
    fromY: number,
    toX: number,
    toY: number
  }[];

  constructor() {}


  static copy(that: VerticesAndEdges): VerticesAndEdges {
    const verticesAndEdges = new VerticesAndEdges();
    verticesAndEdges.vertices = that.vertices;
    verticesAndEdges.edges = that.edges;
    return verticesAndEdges;
  }

}
