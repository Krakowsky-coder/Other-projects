import * as fs from "fs";
import * as readline from "readline";

export const readFileContent = async () => {
  const correctRowsArray = [];

  const fileRows = readline.createInterface({
    input: fs.createReadStream("md-test.txt"),
    // output: process.stdout,
  });

  for await (const line of fileRows) {
    correctRowsArray.push(line);
  }
  return correctRowsArray;
};
