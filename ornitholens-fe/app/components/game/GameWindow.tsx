import BirdPicture from "./BirdPicture";
import AnswerButtonWrapper from "./AnswerButtonWrapper";
import { chooseRandomFolder, getFilesArray } from "@/app/utils/FileOperations";
import React, { useState } from "react";
import { chooseRandomFromArrays } from "@/app/utils/MathUtils";

export default async function GameWindow() {
  const [imageSource, setImageSource] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [possibleAnswersArray, setPossibleAnswersArray] = useState<string[]>(
    []
  );

  try {
    const dir = "public\\images";
    const foldersArray = await getFilesArray(dir);
    const randomFromArrays = chooseRandomFromArrays(foldersArray, 4);
    console.log(`randomFromArrays: ${randomFromArrays}`);
    const [correctAnswerTemp, ...possibleAnswersArrayTemp] = randomFromArrays;
    setCorrectAnswer(correctAnswerTemp);
    setPossibleAnswersArray(possibleAnswersArrayTemp);
    console.log(`Correct Answer name: ${correctAnswer}`);
    console.log("Possible answers: ");
    possibleAnswersArray.forEach((answer) => console.log(answer));

    const randomFile = await chooseRandomFolder(dir + "\\" + correctAnswer);
    console.log(`Bird: ${randomFile}`);
    setImageSource("/" + randomFile.replaceAll("\\", "/").substring(7)); // get rid of /public
    // correctAnswer = parseBirdName(imageSrc);
    console.log(`Correct answer: ${correctAnswer}`);
  } catch (err) {
    console.error("Error occurred:", err);
  }
  return (
    <div>
      <BirdPicture imageSrc={imageSource} />
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
