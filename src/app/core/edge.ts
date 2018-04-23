export class Edge {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  id: string;

  isSameEdge(that: Edge): boolean {
    return (this.fromX === that.fromX && this.fromY === that.fromY && this.toX === that.toX && this.toY === that.toY) ||
      (this.fromX === that.toX && this.fromY === that.toY && this.toX === that.fromX && this.toY === that.fromY);
  }
}
