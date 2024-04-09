import { Box } from "@mui/material";
import BirdPicture from "./BirdPicture";
import AnswerButtonWrapper from "./AnswerButtonWrapper";
import { chooseRandomFolder } from "@/app/utils/FileOperations";
import React from "react";

export default async function GameWindow() {
  let imageSrc = "";
  try {
    const dir = "public\\images";
    const randomFolder = await chooseRandomFolder(dir);
    console.log(`Bird: ${randomFolder}`);
    const randomFile = await chooseRandomFolder(randomFolder);
    console.log(`Bird: ${randomFile}`);
    imageSrc = "/" + randomFile.replaceAll("\\", "/").substring(7); // get rid of /public
  } catch (err) {
    console.error("Error occurred:", err);
  }
  return (
    <Box>
      <BirdPicture imageSrc={imageSrc} />
      {/* <AnswerButtonWrapper></AnswerButtonWrapper> */}
    </Box>
  );
}
