import { Box } from "@mui/material";
import BirdPicture from "./BirdPicture";
import AnswerButtonWrapper from "./AnswerButtonWrapper";
import { chooseRandomFolder } from "@/app/utils/FileOperations";
import React from "react";

export default async function GameWindow() {
  let imageSrc = "";
  let correctAnswer = "";
  let possibleAnswersArray: string[] = [];
  try {
    const dir = "public\\images";
    const randomFolder = await chooseRandomFolder(dir);
    console.log(`Bird: ${randomFolder}`);
    const randomFile = await chooseRandomFolder(randomFolder);
    console.log(`Bird: ${randomFile}`);
    imageSrc = "/" + randomFile.replaceAll("\\", "/").substring(7); // get rid of /public
    correctAnswer = parseBirdName(imageSrc);
    console.log(`Correct answer: ${correctAnswer}`);
  } catch (err) {
    console.error("Error occurred:", err);
  }
  return (
    <div>
      <BirdPicture imageSrc={imageSrc} />
      <AnswerButtonWrapper
        correctAnswer="Penguin"
        answersForButtons={["Penguin", "Albatros", "Sparrow", "Pigeon"]}
      ></AnswerButtonWrapper>
    </div>
  );
}

function parseBirdName(imageSrc: string) {
  return imageSrc
    .substring(imageSrc.lastIndexOf("/") + 1, imageSrc.lastIndexOf("."))
    .split("_")
    .slice(0, -2)
    .join(" ");
}
