import isEqual from 'lodash-es/isEqual'
export interface GraphConnection {
  x: string;
  y: string;
}

export type GraphType = 'DIRECTED' | 'UNDIRECTED';

export class Graph {
  name!: string;
  type!: GraphType;
  verticesCount!: number;
  verticesIds: string[] = [];
  edgesIds: string[] = [];
  connections: GraphConnection[] = [];

  isEmpty() {
    return isEqual(this, new Graph());
  }
}