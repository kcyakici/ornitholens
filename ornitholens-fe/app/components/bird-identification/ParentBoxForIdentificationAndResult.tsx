"use client";

import { useState } from "react";
import UploadButtonsAndImage from "./UploadButtonsAndImage";
import IdentificationResultCard from "./IdentificationResultCard";
import Skeleton from "@mui/material/Skeleton";
import { Button } from "@mui/material";

export default function ParentBoxForIdentificationAndResult() {
  const [imageUrl, setImageUrl] = useState("");
  const [birdName, setBirdName] = useState("");
  const [isIdentificationRunning, setIsIdentificationRunning] = useState(false);

  const reset = () => {
    setImageUrl("");
    setBirdName("");
    setIsIdentificationRunning(false);
  };

  return (
    <div>
      {!isIdentificationRunning ? (
        <UploadButtonsAndImage
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          setBirdName={setBirdName}
          setIsIdentificationRunning={setIsIdentificationRunning}
        />
      ) : birdName ? (
        <div className="flex flex-col mr-auto justify-center items-center">
          <IdentificationResultCard imageSrc={imageUrl} title={birdName} />
          <Button sx={{ marginTop: 6 }} onClick={reset}>
            Try another
          </Button>
        </div>
      ) : (
        <div className="flex flex-col mr-auto justify-center items-center">
          <p>Please wait while identification process is running!</p>
          <Skeleton>
            <IdentificationResultCard imageSrc={imageUrl} title={birdName} />
          </Skeleton>
        </div>
      )}
    </div>
  );
}
