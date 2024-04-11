import Image from "next/image";
import {
  chooseRandomFolder,
  getNumberOfFolders,
} from "../utils/FileOperations";
import { Box } from "@mui/material";
import AnswerButtonWrapper from "../components/game/AnswerButtonWrapper";
import BirdPicture from "../components/game/BirdPicture";
import GameWindow from "../components/game/GameWindow";

export default async function PlayPage() {
  return (
    <div>
      <h1>Play page</h1>
      {/* <GameWindow /> */}
    </div>
  );
}
