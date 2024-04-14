import React from "react";
// import { makeStyles } from "@mui/styles";
import { Avatar, Card, CardContent, Typography } from "@mui/material";
import { Theme } from "@emotion/react";
import ForumPostButtons from "./ForumPostButtons";
import { ForumMember } from "@/app/types/types";
import { useTheme } from "@mui/material/styles";

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
  // const theme = useTheme();
  return (
    <Card
      sx={{ margin: "10px 200px" }}
      // className={classes.card}
    >
      <CardContent>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar
          //   className={classes.avatar}
          >
            {forumMember.name[0]}
          </Avatar>
          <Typography
            sx={{ marginLeft: "20px" }}
            variant="subtitle1"
            component="div"
          >
            {forumMember.name}
          </Typography>
        </div>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Posted at: {parseDate(postedAt)}
        </Typography>
        <Typography variant="body1">{content}</Typography>
      </CardContent>
      <ForumPostButtons postOwnerEmail={forumMember.email} id={id} />
    </Card>
  );
};

export default UserPost;

function parseDate(dateString: string) {
  const dateObj = new Date(dateString);

  // Extract date components
  const year = dateObj.getFullYear();
  const month = dateObj.toLocaleString("default", { month: "long" });
  const day = dateObj.getDate();

  // Extract time components
  const hour = dateObj.getHours();
  const minute = dateObj.getMinutes();

  // Format the date and time
  return `${day} ${month}, ${year} ${hour}:${minute}`;
}
