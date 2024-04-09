"use client";

import { Button } from "@mui/material";
import { useState } from "react";

export default function AnswerButton({
  correctAnswer,
  buttonDisplayAnswer,
}: {
  correctAnswer: string;
  buttonDisplayAnswer: string;
}) {
  const [isClicked, setIsClicked] = useState(false);
  const [buttonStyle, setButtonStyle] = useState({});

  const handleClick = () => {
    if (isClicked) return;

    if (correctAnswer === buttonDisplayAnswer) {
      setButtonStyle(styleCorrect);
    } else {
      setButtonStyle(styleFalse);
    }
    setIsClicked(true);
  };

  return (
    <Button onClick={handleClick} style={buttonStyle}>
      {buttonDisplayAnswer}
    </Button>
  );
}

const styleCorrect = { backgroundColor: "green" };
const styleFalse = { backgroundColor: "red" };
