import React from "react";
// import { makeStyles } from "@mui/styles";
import { Avatar, Card, CardContent, Typography } from "@mui/material";
import { Theme } from "@emotion/react";

// const useStyles = makeStyles((theme : Theme) => ({
//   card: {
//     marginBottom: theme.spacing(2),
//   },
//   avatar: {
//     marginRight: theme.spacing(2),
//   },
// }));

type UserPostProps = {
  username: string;
  postedAt: string;
  content: string;
};

const UserPost = ({ username, postedAt, content }: UserPostProps) => {
  return (
    <Card
    // className={classes.card}
    >
      <CardContent>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar
          //   className={classes.avatar}
          >
            {username[0]}
          </Avatar>
          <Typography variant="subtitle1" component="div">
            {username}
          </Typography>
        </div>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Posted at: {postedAt}
        </Typography>
        <Typography variant="body1">{content}</Typography>
      </CardContent>
    </Card>
  );
};

export default UserPost;
