import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { parseDateBirdCard, parseDateForum } from "@/app/utils/DateUtils";

export default function BirdCard({
  imageSrc,
  title,
  date,
}: {
  imageSrc: string;
  title: string;
  date: string;
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
        <Typography variant="body2" color="text.secondary">
          {parseDateBirdCard(date)}
        </Typography>
      </CardContent>
    </Card>
  );
}
