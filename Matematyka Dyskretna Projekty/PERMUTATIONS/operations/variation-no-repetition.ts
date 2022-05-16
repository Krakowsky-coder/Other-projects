import { factorial } from "../helpers/factorial";

export function variationNoRepetition(citiesArray: string[], counter: number) {
  const k = counter;
  const n = citiesArray.length;

  const arr = [];
  const free = citiesArray;
  const resultsArray = [];

  function main() {
    generateVariationsNoRepetitions(0);
  }

  function generateVariationsNoRepetitions(index: number) {
    if (index >= k) {
      printVariations();
    } else {
      for (let i = index; i < n; i++) {
        arr[index] = free[i];
        swap(i, index);
        generateVariationsNoRepetitions(index + 1);
        swap(i, index);
      }
    }
  }

  function swap(i: number, index: number) {
    let old = free[i];
    free[i] = free[index];
    free[index] = old;
  }

  function printVariations() {
    resultsArray.push(arr);
  }
  main();
  return resultsArray;
}

export const variationNoRepetitionResult = (n: number, k: number) => {
  const result = factorial(n) / factorial(n - k);
  return result;
};
