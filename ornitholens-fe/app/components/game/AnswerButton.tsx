"use client";

import { Button } from "@mui/material";
import { useState } from "react";

export default function AnswerButton({
  correctAnswer,
  buttonDisplayAnswer,
  handleGameWindowAnswerGiven,
  isButtonsDisabled,
  disableButtons,
}: {
  correctAnswer: string;
  buttonDisplayAnswer: string;
  handleGameWindowAnswerGiven(): void;
  isButtonsDisabled: boolean;
  disableButtons(): void;
}) {
  const [isClicked, setIsClicked] = useState(false);
  const [buttonStyle, setButtonStyle] = useState({});

  const handleClick = () => {
    if (isClicked || isButtonsDisabled) return;

    if (correctAnswer === buttonDisplayAnswer) {
      setButtonStyle(styleCorrect);
    } else {
      setButtonStyle(styleFalse);
    }
    setIsClicked(true);
    disableButtons();
    handleGameWindowAnswerGiven();
  };

  return (
    <Button onClick={handleClick} style={buttonStyle}>
      {buttonDisplayAnswer}
    </Button>
  );
}

const styleCorrect = { backgroundColor: "green" };
const styleFalse = { backgroundColor: "red" };
