import { Card, Typography, CardContent } from "@mui/material";
import Image from "next/image";

export default function IdentificationResultCard({
  imageSrc,
  title,
}: {
  imageSrc: string;
  title: string;
}) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      {/* <CardMedia sx={{ height: 140 }} image={imageSrc} title={title} /> */}
      <Image
        priority
        src={imageSrc}
        alt="An image of a bird"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "225px", height: "auto" }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
}
