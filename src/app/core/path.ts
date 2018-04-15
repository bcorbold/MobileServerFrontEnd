import { VerticesAndEdges } from './vertices-and-edges';

export class Path {
  path: VerticesAndEdges[];

  constructor(that: Path) {
    this.path = that.path;
  }

}
