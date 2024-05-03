import { Box } from "@mui/material";
import Image from "next/image";

export default function BirdPicture({ imageSrc }: { imageSrc: string }) {
  return (
    <Box>
      <Image
        priority
        src={imageSrc}
        alt="An image of a bird"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
      />
    </Box>
  );
}
