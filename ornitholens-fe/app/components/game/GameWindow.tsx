"use client";

import BirdPicture from "./BirdPicture";
import AnswerButtonWrapper from "./AnswerButtonWrapper";
// import { chooseRandomFolder, getFilesArray } from "@/app/utils/FileOperations";
// import { useState } from "react";
import { GET } from "@/app/routes/route";

export default async function GameWindow() {
  let foldersArray: string[];
  let response2;
  let imageSrc = "";
  let correctAnswer: string = "";
  let possibleAnswersArray: string[] = [];
  try {
    const response = await GET();
    console.log(`Response body: ${response?.body}`);
    const response1 = await response?.json();
    console.log(`Response body: ${response1.body.imageUrl}`);
    response2 = response1;

    const dir = "public\\images";

    // foldersArray = await getFilesArray(dir);
    // const randomFromArrays = chooseRandomFromArrays(foldersArray, 4);
    // console.log(`randomFromArrays: ${randomFromArrays}`);
    // [correctAnswer, ...possibleAnswersArray] = randomFromArrays;
    // console.log(`Correct Answer name: ${correctAnswer}`);
    // console.log("Possible answers: ");
    // possibleAnswersArray.forEach((answer) => console.log(answer));

    // const randomFile = await chooseRandomFolder(dir + "\\" + correctAnswer);
    // console.log(`Bird: ${randomFile}`);
    // imageSrc = "/" + randomFile.replaceAll("\\", "/").substring(7); // get rid of /public
    // correctAnswer = parseBirdName(imageSrc);
    console.log(`Correct answer: ${correctAnswer}`);
  } catch (err) {
    console.error("Error occurred:", err);
  }
  return (
    <div>
      <BirdPicture imageSrc={response2.body.imageUrl} />
      <AnswerButtonWrapper
        correctAnswer={parseBirdName(correctAnswer)}
        answersForButtons={[
          parseBirdName(correctAnswer),
          ...possibleAnswersArray.map((name) => parseBirdName(name)),
        ]}
      ></AnswerButtonWrapper>
    </div>
  );
}

function parseBirdName(imageFolderName: string) {
  return imageFolderName
    .substring(imageFolderName.lastIndexOf(".") + 1)
    .split("_")
    .join(" ");
}
