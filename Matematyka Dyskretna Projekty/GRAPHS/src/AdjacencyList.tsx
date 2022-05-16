import React, { useEffect, useState } from "react";

interface IAdjencyList {
  x: number;
  testArray: number[][];
}

export const AdjacencyList = ({ testArray, x }: IAdjencyList) => {
  const [list, setList] = useState<{ [key: string]: number[] }>();

  useEffect(() => {
    setList(test);
  }, []);

  const injectedList = (testArray: number[][]): any => {
    let control: { [key: string]: number[] } = {};

    for (let i = 0; i < x; i++) {
      let controlArray: number[] = [];

      const row = testArray[i];

      //   console.log(`${i + 1} -->`);

      for (let j = 0; j < x; j++) {
        const singleArray = row;
        if (singleArray[j] === 1) {
          controlArray.push(j + 1);
        }
      }
      control[`row ${i}`] = controlArray;
    }
    return control;
  };

  const test = injectedList(testArray);
  //   console.log(list);

  return <div></div>;
};
