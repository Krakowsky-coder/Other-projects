import { readFileContent } from "./uploader";

export class IPermutationInfo {
  title: string;
  generate: string;
  elements: string;
  card: string;
  permutationElements: string[] = [];
  save: string;
}

export const parseArray = async () => {
  const permutationInfo = new IPermutationInfo();
  const rowsArray = await readFileContent();

  let fileSection = 0;
  let lastSetIndex = 0;

  if (rowsArray !== undefined) {
    rowsArray.forEach((row, i, arr) => {
      if (
        row[0] !== "#" &&
        row[0] !== " " &&
        row.length > 1 &&
        row[0] !== "\n"
      ) {
        switch (fileSection) {
          case 0:
            lastSetIndex = i;
            permutationInfo.title = row.substr(row.indexOf("=") + 1);
            break;
          case 1:
            lastSetIndex = i;
            permutationInfo.generate = row.substr(row.indexOf("=") + 1);
            break;
          case 2:
            lastSetIndex = i;
            permutationInfo.elements = row.substr(row.indexOf("=") + 1);
            break;
          case 3:
            lastSetIndex = i;
            permutationInfo.card = row.substr(row.indexOf("=") + 1);
            break;
          case 4:
            lastSetIndex = i;
            permutationInfo.save = row.substr(row.indexOf("=") + 1);
            break;
          case 5:
            permutationInfo.permutationElements.push(row);
            break;
        }
        if (arr.length > i + 1 && lastSetIndex === i) {
          if (
            arr[i + 1][0] === "#" ||
            arr[i + 1][0] === " " ||
            arr[i + 1].length <= 1 ||
            arr[i + 1][0] === "\n"
          ) {
            fileSection++;
          }
        }
      }
    });
  }
  return permutationInfo;
};
