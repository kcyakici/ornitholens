"use client";
import useSWR from "swr";
import BirdPicture from "./BirdPicture";
import AnswerButtonWrapper from "./AnswerButtonWrapper";
import { useEffect, useState } from "react";
import { GameImageAndAnswers } from "@/app/types/types";
import { Button } from "@mui/material";
import { getImageAndAnswers } from "@/app/service/AxiosAuthService";

export default function GameWindow() {
  const [gameInfo, setGameInfo] = useState<GameImageAndAnswers>();
  const [isAnswerGiven, setIsAnswerGiven] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const res = await getImageAndAnswers();
      if (res) {
        const resData = res?.data;
        const resDataCopy = {
          ...resData,
          imageUrl: `http://${resData.imageUrl}`,
        };
        console.log(res);
        setGameInfo(resDataCopy);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      {gameInfo ? (
        <div>
          <BirdPicture imageSrc={gameInfo.imageUrl} />
          <AnswerButtonWrapper
            correctAnswer={gameInfo.correctAnswer}
            answersForButtons={gameInfo.answers}
          ></AnswerButtonWrapper>
        </div>
      ) : (
        <></>
      )}
      {/* {isAnswerGiven ? <Button onClick={fetchGameData}>Next</Button> : <></>} */}
    </>
  );
}
