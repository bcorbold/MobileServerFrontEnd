import { VerticesAndEdges } from './vertices-and-edges';

export class Path {
  path: VerticesAndEdges[];

  constructor() {}

  static copy(that: Path): Path {
    const newPath = new Path();
    newPath.path = [];
    that.path.forEach(verticesAndEdges => {
      newPath.path.push(VerticesAndEdges.copy(verticesAndEdges));
    });
    return newPath;
  }
}
