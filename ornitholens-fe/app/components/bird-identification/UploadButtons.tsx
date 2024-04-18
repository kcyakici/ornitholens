"use client";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { ChangeEvent, useState } from "react";
import { Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function UploadButtons({
  handleChange,
  handleUpload,
  filename,
  photo,
}: {
  handleChange(e: ChangeEvent<HTMLInputElement>): void;
  handleUpload(): void;
  filename: string;
  photo?: File;
}) {
  return (
    <Stack alignItems="center" spacing={2}>
      <Stack direction="row" alignItems="center" spacing={2}>
        {photo ? <Box>{filename}</Box> : <></>}
        <Button
          component="label"
          variant="contained"
          endIcon={<AddAPhotoIcon />}
        >
          Upload
          <VisuallyHiddenInput
            type="file"
            accept="image/*"
            onChange={handleChange}
          />
        </Button>
      </Stack>
      <Button
        variant="contained"
        endIcon={<SearchIcon />}
        onClick={handleUpload}
      >
        Identify
      </Button>
    </Stack>
  );
}
