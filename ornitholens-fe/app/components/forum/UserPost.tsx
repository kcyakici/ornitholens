import React from "react";
// import { makeStyles } from "@mui/styles";
import { Avatar, Card, CardContent, Typography } from "@mui/material";
import { Theme } from "@emotion/react";
import ForumPostButtons from "./ForumPostButtons";
import { ForumMember } from "@/app/types/types";

// const useStyles = makeStyles((theme : Theme) => ({
//   card: {
//     marginBottom: theme.spacing(2),
//   },
//   avatar: {
//     marginRight: theme.spacing(2),
//   },
// }));

type UserPostProps = {
  forumMember: ForumMember;
  postedAt: string;
  content: string;
  id: string;
};

const UserPost = ({ forumMember, postedAt, content, id }: UserPostProps) => {
  return (
    <Card
    // className={classes.card}
    >
      <CardContent>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar
          //   className={classes.avatar}
          >
            {forumMember.name[0]}
          </Avatar>
          <Typography variant="subtitle1" component="div">
            {forumMember.name}
          </Typography>
        </div>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Posted at: {postedAt}
        </Typography>
        <Typography variant="body1">{content}</Typography>
      </CardContent>
      <ForumPostButtons postOwnerEmail={forumMember.email} id={id} />
    </Card>
  );
};

export default UserPost;
