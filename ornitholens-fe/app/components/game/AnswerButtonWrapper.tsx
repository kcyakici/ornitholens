import { useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import AnswerButton from "./AnswerButton";

type AnswerButtonWrapperProps = {
  correctAnswer: string;
  answersForButtons: string[];
  handleRightAnswer(message: string): void;
  handleWrongAnswer(message: string): void;
};

export default function AnswerButtonWrapper({
  correctAnswer,
  answersForButtons,
  handleRightAnswer,
  handleWrongAnswer,
}: AnswerButtonWrapperProps) {
  const [isButtonsDisabled, setIsButtonsDisabled] = useState(false);

  const disableButtons = () => {
    setIsButtonsDisabled(true);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        alignContent="center"
        justifyContent="center" // Center items horizontally
        alignItems="center" // Center items vertically
      >
        {answersForButtons.map((answer, index) => (
          <Grid xs={6} key={index}>
            <AnswerButton
              isButtonsDisabled={isButtonsDisabled}
              correctAnswer={correctAnswer}
              buttonDisplayAnswer={answer}
              handleRightAnswer={handleRightAnswer}
              handleWrongAnswer={handleWrongAnswer}
              disableButtons={disableButtons}
            ></AnswerButton>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
