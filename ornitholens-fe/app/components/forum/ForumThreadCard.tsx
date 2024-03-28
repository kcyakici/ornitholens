"use client";
import React from "react";
// import { makeStyles } from "@mui/system/styles"; // Import makeStyles from @mui/system/styles
import { Card, CardContent, Typography, Avatar } from "@mui/material";
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
    <Card>
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
