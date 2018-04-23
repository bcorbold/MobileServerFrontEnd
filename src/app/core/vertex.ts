export class Vertex {
  xposition: number; // todo: look into why the BE changes xPosition to xposition
  yposition: number;
  id: string;

  constructor(that: any) {
    this.xposition = that.xposition;
    this.yposition = that.yposition;
    this.id = that.id;
  }

  equals(that: Vertex): boolean {
    return this.id === that.id;
  }

}
