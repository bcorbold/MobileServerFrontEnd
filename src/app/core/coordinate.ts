export class Coordinate {
  x: number;
  y: number;

  static copy(that: Coordinate): Coordinate {
    const coordinate: Coordinate = new Coordinate();

    coordinate.x = that.x;
    coordinate.y = that.y;

    return coordinate;
  }

  constructor() {}

}
