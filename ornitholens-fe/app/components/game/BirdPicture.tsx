import { chooseRandomFolder } from "@/app/utils/FileOperations";
import { Box } from "@mui/material";
import Image from "next/image";

export default async function BirdPicture({ imageSrc }: { imageSrc: string }) {
  return (
    <Box>
      <Image
        src={imageSrc}
        alt="An image of a bird"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "20%", height: "auto" }}
      ></Image>
    </Box>
  );
}
