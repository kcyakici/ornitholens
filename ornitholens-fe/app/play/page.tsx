import Image from "next/image";
import {
  chooseRandomFolder,
  getNumberOfFolders,
} from "../utils/FileOperations";
import { Box } from "@mui/material";
import AnswerButtonWrapper from "../components/game/AnswerButtonWrapper";

export default async function PlayPage() {
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
      <h1>Play page</h1>
      <Image
        src={imageSrc}
        alt="An image of a bird"
        priority
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "20%", height: "auto" }}
      ></Image>
      <AnswerButtonWrapper
        correctAnswer="Penguin"
        answersForButtons={["Penguin", "Albatross", "Sparrow", "Pigeon"]}
      ></AnswerButtonWrapper>
    </Box>
  );
}
