"use client";
import { ChangeEvent, useState } from "react";
import UploadButtons from "./UploadButtons";
import { uploadImage } from "@/app/service/AxiosAuthService";
import BirdPicture from "../game/BirdPicture";
import { Box } from "@mui/material";
import { useAuth } from "@/app/context/AuthContext";

export default function UploadButtonsAndImage({
  imageUrl,
  setImageUrl,
  setBirdName,
  setIsIdentificationRunning,
}: {
  imageUrl: string;
  setImageUrl(url: string): void;
  setBirdName(birdName: string): void;
  setIsIdentificationRunning(isRunning: boolean): void;
}) {
  const [photo, setPhoto] = useState<File>();
  const [filename, setFilename] = useState("");
  const { token } = useAuth();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    const file = e.target.files[0];
    const { name } = file;
    setPhoto(file);
    setImageUrl(URL.createObjectURL(file));
    setFilename(name);
  };

  const handleUpload = async () => {
    if (!photo) return;

    setIsIdentificationRunning(true);
    const response = await uploadImage(photo, token);
    if (response) {
      console.log("Got response: " + response.data);
      const { data } = response;
      setBirdName(data.classname);
    }
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      minHeight="100vh"
    >
      {photo ? <BirdPicture imageSrc={imageUrl} /> : <></>}
      <UploadButtons
        handleChange={handleChange}
        filename={filename}
        handleUpload={handleUpload}
        photo={photo}
      />
    </Box>
  );
}
