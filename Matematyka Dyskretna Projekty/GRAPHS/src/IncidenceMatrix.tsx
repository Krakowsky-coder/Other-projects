import React from "react";

interface IMatrixvalues {
  x: number; //krawedzie
  y: number; //wierzchołki
}

export const IncidenceMatrix = ({ x, y }: IMatrixvalues) => {
  const createMatrix = (x: number, y: number): number[][] => {
    return Array.from(Array(x), () => new Array(y));
  };

  const testMatrix = createMatrix(y, x);

  let ed_no = 0;

  for (let i = 0; i < y; i++) {
    for (let j = 0; j < x; j++) {
      testMatrix[i][j] = 0;
    }
  }

  console.log(testMatrix);
  //   console.log(testMatrix);

  const add_edge = (u: any, v: any) => {
    testMatrix[u][ed_no] = 1;
    testMatrix[v][ed_no] = 1;
    ed_no++; //increase the edge number
  };

  const v = 6; //there are 6 vertices in the graph
  const e = 9; //there are 9 edges in the graph
  add_edge(0, 1);
  add_edge(0, 2);
  add_edge(1, 2);
  add_edge(1, 3);
  add_edge(2, 3);
  add_edge(3, 4);

  return <div></div>;
};
