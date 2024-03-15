"use client";
import React from "react";
import { Theme } from "@mui/material/styles";
// import { makeStyles } from "@mui/system/styles"; // Import makeStyles from @mui/system/styles
import { Card, CardContent, Typography, Avatar } from "@mui/material";
import Link from "next/link";

// const useStyles = makeStyles((theme: Theme) => ({
//   card: {
//     marginBottom: theme.spacing(2), // Adjust the margin as needed
//   },
//   avatar: {
//     marginRight: theme.spacing(2),
//   },
// }));

type ForumThreadCardProps = {
  threadId: number;
  title: string;
  lastReplied: string;
  openedBy: string;
  openedTime: string;
  // handleClick(): void;
};

const ForumThreadCard = ({
  threadId,
  title,
  lastReplied,
  openedBy,
  openedTime,
}: // handleClick,
ForumThreadCardProps) => {
  // const classes = useStyles();

  return (
    <Card
    // className={classes.card}
    // onClick={handleClick}
    >
      <CardContent>
        <Link href={`/community/thread/${threadId}`} passHref>
          <Typography variant="h5" component="h2">
            {title}
          </Typography>
        </Link>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Last replied: {lastReplied}
        </Typography>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar
          // className={classes.avatar}
          >
            {openedBy[0]}
          </Avatar>{" "}
          {/* Displaying the first character of the opener's name */}
          <Typography variant="body2" color="textSecondary">
            Opened by: {openedBy}
          </Typography>
        </div>
        <Typography variant="body2" color="textSecondary">
          Opened time: {openedTime}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ForumThreadCard;
