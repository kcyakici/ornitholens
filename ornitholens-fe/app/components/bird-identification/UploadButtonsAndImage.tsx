"use client";
import { ChangeEvent, useState } from "react";
import UploadButtons from "./UploadButtons";
import { uploadImage } from "@/app/service/AxiosAuthService";
import BirdPicture from "../game/BirdPicture";
import { Box } from "@mui/material";

export default function UploadButtonsAndImage() {
  const [photo, setPhoto] = useState<File>();
  const [filename, setFilename] = useState("");
  const [imageUrl, setImageUrl] = useState("");

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

  const handleUpload = () => {
    if (!photo) return;
    uploadImage(photo);
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
