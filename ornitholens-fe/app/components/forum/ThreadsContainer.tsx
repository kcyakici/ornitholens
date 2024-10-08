import React from "react";
import { Grid } from "@mui/material";
import ForumThreadCard from "./ForumThreadCard";
import { ForumThreadWithoutPosts } from "@/app/types/types";
import { PostCreationButton } from "./PostCreationButton";
import { getForumThreads } from "@/app/service/AxiosAuthService";
import { parseDateForum } from "@/app/utils/DateUtils";

export async function ThreadsContainer() {
  const forumThreadsResponse = await getForumThreads();
  const { data: forumThreads } = forumThreadsResponse;

  return (
    <Grid container justifyItems="end" justifyContent="center" spacing={2}>
      <Grid item xs={12} md={8} textAlign={"end"}>
        <PostCreationButton />
      </Grid>
      {forumThreads.map((thread: ForumThreadWithoutPosts) => (
        <Grid item key={thread.id} xs={12} md={8}>
          <ForumThreadCard
            threadId={thread.id}
            title={thread.title}
            openedTime={parseDateForum(thread.time)}
          />
        </Grid>
      ))}
    </Grid>
  );
}
