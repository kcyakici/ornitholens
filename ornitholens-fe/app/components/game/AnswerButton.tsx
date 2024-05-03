"use client";

import { Button } from "@mui/material";
import { useState } from "react";

export default function AnswerButton({
  correctAnswer,
  buttonDisplayAnswer,
  isButtonsDisabled,
  disableButtons,
  handleRightAnswer,
  handleWrongAnswer,
}: {
  correctAnswer: string;
  buttonDisplayAnswer: string;
  isButtonsDisabled: boolean;
  disableButtons(): void;
  handleRightAnswer(message: string): void;
  handleWrongAnswer(message: string): void;
}) {
  const [isClicked, setIsClicked] = useState(false);
  const [buttonStyle, setButtonStyle] = useState({});

  const handleClick = () => {
    if (isClicked || isButtonsDisabled) return;

    const userMessage = `The correct answer was ${correctAnswer}`;

    if (correctAnswer === buttonDisplayAnswer) {
      handleRightAnswer("Congratulations! " + userMessage);
      setButtonStyle(styleCorrect);
    } else {
      handleWrongAnswer("Sorry! " + userMessage);
      setButtonStyle(styleFalse);
    }
    setIsClicked(true);
    disableButtons();
  };

  return (
    <Button onClick={handleClick} style={buttonStyle}>
      {buttonDisplayAnswer}
    </Button>
  );
}

const styleCorrect = { backgroundColor: "green" };
const styleFalse = { backgroundColor: "red" };
