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

  constructor(that: VerticesAndEdges) {
    this.vertices = that.vertices;
    this.edges = that.edges;
  }

}
