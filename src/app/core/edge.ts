import { Vertex } from './vertex';

export class Edge {
  source: Vertex;
  destination: Vertex;
  id: string;

  constructor(that: any) {
    this.source = new Vertex(that.source);
    this.destination = new Vertex(that.destination);
    this.id = that.id;
  }

  isSameEdge(that: Edge): boolean {
    return (this.source.equals(that.source) && this.destination.equals(that.destination)) ||
      (this.source.equals(that.destination) && this.destination.equals(that.source));
  }
}
