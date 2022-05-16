import * as express from "express";
const app = express();
const port = 3000;
import { IPermutationInfo, parseArray } from "./parser";
import { factorial } from "./helpers/factorial";
import { permutator } from "./operations/permutator";
import {
  combinations,
  k_combinations,
  combinationResult,
} from "./operations/combination";
import {
  variationRepetition,
  variationRepetitionResult,
} from "./operations/variation-repetition";
import {
  variationNoRepetition,
  variationNoRepetitionResult,
} from "./operations/variation-no-repetition";
var fs = require("fs");

const start = async () => {
  const parsedExerciseInfo = await parseArray();
  const showAddition = parsedExerciseInfo.generate === "TRUE" ? true : false;
  const saveToFile = parsedExerciseInfo.save === "TRUE" ? true : false;

  displayResults(parsedExerciseInfo, showAddition, saveToFile);
};

const displayResults = (
  parsedExerciseInfo: IPermutationInfo,
  showAddition: boolean,
  saveToFile: boolean
) => {
  switch (parsedExerciseInfo.title) {
    case "PERMUTACJA":
      showAddition
        ? /*
           *first argument is an array of cities
           */
          console.log(
            permutator(parsedExerciseInfo.permutationElements),
            "Wynik: ",
            factorial(parseInt(parsedExerciseInfo.card))
          )
        : //argument is an array length
          console.log("Wynik: ", factorial(parseInt(parsedExerciseInfo.card)));
      saveToFile
        ? saveResultToFile(
            permutator(parsedExerciseInfo.permutationElements),
            factorial(parseInt(parsedExerciseInfo.card))
          )
        : "";
      break;
    case "KOMBINACJA":
      showAddition
        ? /*
           *first argument is an array of cities, for second argument we can set number between 1 and array.length to see different results
           */
          console.log(
            k_combinations(parsedExerciseInfo.permutationElements, 2),
            "Wynik: ",
            combinationResult(parseInt(parsedExerciseInfo.card), 2)
          )
        : /*
           *first argument is an array length, for second argument we can set number between 1 and array.length to see different results
           */
          console.log(
            "Wynik: ",
            combinationResult(parseInt(parsedExerciseInfo.card), 2)
          );
      saveToFile
        ? saveResultToFile(
            k_combinations(parsedExerciseInfo.permutationElements, 2),
            combinationResult(parseInt(parsedExerciseInfo.card), 2)
          )
        : "";
      break;
    case "WARIACJA_Z_POWTÓRZENIAMI":
      showAddition
        ? /*
           *first argument is an array of cities, for second argument we can set number between 1 and array.length to see different results
           */
          console.log(
            variationRepetition(parsedExerciseInfo.permutationElements, 2),
            "Wynik: ",
            variationRepetitionResult(parseInt(parsedExerciseInfo.card), 2)
          )
        : /*
           *first argument is an array length, for second argument we can set number between 1 and array.length to see different results
           */
          console.log(
            "Wynik: ",
            variationRepetitionResult(parseInt(parsedExerciseInfo.card), 2)
          );
      saveToFile
        ? saveResultToFile(
            variationRepetition(parsedExerciseInfo.permutationElements, 2),
            variationRepetitionResult(parseInt(parsedExerciseInfo.card), 2)
          )
        : "";
      break;
    case "WARIACJA_BEZ_POWTÓRZEŃ":
      showAddition
        ? /*
           *first argument is an array of cities, for second argument we can set number between 1 and array.length to see different results
           */

          console.log(
            variationNoRepetition(
              parsedExerciseInfo.permutationElements,
              parseInt(parsedExerciseInfo.card)
            ),
            "Wynik: ",
            variationNoRepetitionResult(parseInt(parsedExerciseInfo.card), 4)
          )
        : /*
           *first argument is an array length, for second argument we can set number between 1 and array.length to see different results
           */
          console.log(
            "Wynik: ",
            variationNoRepetitionResult(parseInt(parsedExerciseInfo.card), 4)
          );
      saveToFile
        ? saveResultToFile(
            variationNoRepetition(
              parsedExerciseInfo.permutationElements,
              parseInt(parsedExerciseInfo.card)
            ),
            variationNoRepetitionResult(parseInt(parsedExerciseInfo.card), 4)
          )
        : "";
      break;
  }
};

start();

const saveResultToFile = (arr: any[], result: number) => {
  const file = fs.createWriteStream("finalResult.txt");
  file.on("error", function (err) {
    /* error handling */
  });
  arr.forEach(function (v) {
    file.write(v.join(", ") + "\n");
  });
  file.write(`Wynik: ${result}` + "\n");
  file.end();
};

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
