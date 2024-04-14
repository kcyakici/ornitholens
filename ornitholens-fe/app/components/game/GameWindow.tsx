"use client";
import BirdPicture from "./BirdPicture";
import AnswerButtonWrapper from "./AnswerButtonWrapper";
import { useEffect, useState } from "react";
import { GameImageAndAnswers } from "@/app/types/types";
import { Button } from "@mui/material";
import { getImageAndAnswers } from "@/app/service/AxiosAuthService";

export default function GameWindow() {
  const [gameInfo, setGameInfo] = useState<GameImageAndAnswers>();
  const [isAnswerGiven, setIsAnswerGiven] = useState(false);
  const [elementKey, setElementKey] = useState(0);

  const handleGameWindowAnswerGiven = (): void => {
    setIsAnswerGiven(true);
  };

  const handleNextButtonClick = (): void => {
    fetchData();
    setIsAnswerGiven(false);
    setElementKey(elementKey + 1);
  };

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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {gameInfo ? (
        <div>
          <BirdPicture imageSrc={gameInfo.imageUrl} />
          <AnswerButtonWrapper
            key={elementKey}
            correctAnswer={gameInfo.correctAnswer}
            answersForButtons={gameInfo.answers}
            handleGameWindowAnswerGiven={handleGameWindowAnswerGiven}
          ></AnswerButtonWrapper>
        </div>
      ) : (
        <></>
      )}
      {isAnswerGiven ? (
        <Button onClick={handleNextButtonClick}>Next</Button>
      ) : (
        <></>
      )}
    </>
  );
}
