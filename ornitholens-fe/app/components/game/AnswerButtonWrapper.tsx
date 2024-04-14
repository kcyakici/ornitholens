import { useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import AnswerButton from "./AnswerButton";

type AnswerButtonWrapperProps = {
  correctAnswer: string;
  answersForButtons: string[];
  handleGameWindowAnswerGiven(): void;
};

export default function AnswerButtonWrapper({
  correctAnswer,
  answersForButtons,
  handleGameWindowAnswerGiven,
}: AnswerButtonWrapperProps) {
  const [isButtonsDisabled, setIsButtonsDisabled] = useState(false);

  const disableButtons = () => {
    setIsButtonsDisabled(true);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {answersForButtons.map((answer, index) => (
          <Grid xs={6} key={index}>
            <AnswerButton
              isButtonsDisabled={isButtonsDisabled}
              correctAnswer={correctAnswer}
              buttonDisplayAnswer={answer}
              handleGameWindowAnswerGiven={handleGameWindowAnswerGiven}
              disableButtons={disableButtons}
            ></AnswerButton>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
