import React from "react";
import { Card, CardContent, Typography, Avatar, Grid } from "@mui/material";
import Link from "next/link";

type ForumThreadCardProps = {
  threadId: string;
  title: string;
  lastReplied: string;
  openedBy: string;
  openedTime: string;
};

const ForumThreadCard = ({
  threadId,
  title,
  lastReplied,
  openedBy,
  openedTime,
}: ForumThreadCardProps) => {
  return (
    <Card
      sx={{
        width: "100%",
        margin: "10px 0",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <CardContent>
        <Link href={`/community/thread/${threadId}`} passHref>
          <Typography
            variant="h5"
            component="h2"
            sx={{ textDecoration: "none", color: "inherit" }}
          >
            {title}
          </Typography>
        </Link>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Last replied: {lastReplied}
        </Typography>
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <Avatar>{openedBy[0]}</Avatar>
          </Grid>
          <Grid item>
            <Typography variant="body2" color="textSecondary">
              Opened by: {openedBy}
            </Typography>
          </Grid>
        </Grid>
        <Typography variant="body2" color="textSecondary">
          Opened time: {openedTime}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ForumThreadCard;
