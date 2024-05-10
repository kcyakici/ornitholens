"use client";
import BirdPicture from "./BirdPicture";
import AnswerButtonWrapper from "./AnswerButtonWrapper";
import { useEffect, useState } from "react";
import { GameImageAndAnswers } from "@/app/types/types";
import { Button, Typography } from "@mui/material";
import {
  getImageAndAnswers,
  getUserScore,
  updateUserScore,
} from "@/app/service/AxiosAuthService";
import { useAuth } from "@/app/context/AuthContext";

export default function GameWindow() {
  const { token } = useAuth();
  const [gameInfo, setGameInfo] = useState<GameImageAndAnswers>();
  const [isAnswerGiven, setIsAnswerGiven] = useState(false);
  const [elementKey, setElementKey] = useState(0);
  const [congratsMessage, setCongratsMessage] = useState("");
  const [score, setScore] = useState<number>(0);

  const handleGameWindowAnswerGiven = (): void => {
    setIsAnswerGiven(true);
  };

  const updateUserCongratsMessage = (message: string): void => {
    setCongratsMessage(message);
  };

  const handleRightAnswer = (message: string) => {
    updateUserCongratsMessage(message);
    const newScore = score + 10;
    setScore(newScore);
    updateUserScore(token, newScore);
    handleGameWindowAnswerGiven();
  };

  const handleWrongAnswer = (message: string) => {
    updateUserCongratsMessage(message);
    handleGameWindowAnswerGiven();
  };

  const handleNextButtonClick = (): void => {
    fetchImageData();
    setIsAnswerGiven(false);
    setElementKey(elementKey + 1);
  };

  async function fetchImageData() {
    console.log("Inside fetch image data: " + token);
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

  async function fetchScore() {
    const res = await getUserScore(token);
    if (res) {
      setScore(res.data);
    }
  }

  useEffect(() => {
    if (!token) return;

    fetchImageData();
    fetchScore();
  }, [token]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        margin: "auto",
        justifyContent: "center",
        alignItems: "center",
        width: "60vw",
      }}
    >
      {gameInfo ? (
        <>
          <Typography variant="h3" color={"#65e22b"}>
            Who is this bird?
          </Typography>
          <BirdPicture imageSrc={gameInfo.imageUrl} />
          {isAnswerGiven ? `${congratsMessage}` : `${""}`}
          <div>Your score: {score}</div>
          <AnswerButtonWrapper
            key={elementKey}
            correctAnswer={gameInfo.correctAnswer}
            answersForButtons={gameInfo.answers}
            handleRightAnswer={handleRightAnswer}
            handleWrongAnswer={handleWrongAnswer}
          ></AnswerButtonWrapper>
        </>
      ) : (
        <></>
      )}
      {isAnswerGiven ? (
        <Button onClick={handleNextButtonClick}>Next</Button>
      ) : (
        <></>
      )}
    </div>
  );
}
