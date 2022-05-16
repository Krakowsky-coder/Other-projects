import { AdjacencyList } from "./AdjacencyList";

interface IMatrixvalues {
  x: number;
  y: number;
}

export const AdjacencyMatrix = ({ x, y }: IMatrixvalues) => {
  const createMatrix = (x: number, y: number): number[][] => {
    return Array.from(Array(x), () => new Array(y));
  };

  const testArray = createMatrix(x, y);

  for (let i = 0; i < x; i++) {
    for (let j = 0; j < y; j++) {
      testArray[i][j] = 0;
    }
  }

  const add_edge = (u: number, v: number) => {
    testArray[u][v] = 1;
    testArray[v][u] = 1;
  };

  add_edge(0, 1);
  add_edge(0, 2);
  add_edge(1, 2);
  add_edge(1, 3);
  add_edge(2, 3);
  add_edge(3, 4);

  // console.log(testArray);
  // injectedList(testArray);

  return (
    <div>
      <AdjacencyList testArray={testArray} x={x} />
    </div>
  );
};
