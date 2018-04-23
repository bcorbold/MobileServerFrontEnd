import { Vertex } from './vertex';

export class Edge {
  source: Vertex;
  destination: Vertex;
  id: string;

  isSameEdge(that: Edge): boolean {
    return (this.source.equals(that.source) && this.destination.equals(that.destination)) ||
      (this.source.equals(that.destination) && this.destination.equals(that.source));
  }
}
