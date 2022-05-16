let res;
const variations = (
  arr: string[],
  k: number,
  index: number,
  current: string[]
) => {
  if (k === index) {
    return res.push(current.slice());
  }
  for (let i = 0; i < arr.length; i++) {
    current[index] = arr[i];
    variations(arr, k, index + 1, current);
  }
};

export const variationRepetition = (arr: string[], k: number) => {
  res = [];
  variations(arr, k, 0, []);
  const temp = res;
  res = undefined;
  return temp;
};

export const variationRepetitionResult = (n: number, k: number) => {
  return Math.pow(n, k);
};
