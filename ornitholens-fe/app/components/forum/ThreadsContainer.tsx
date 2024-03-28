import { getForumThreads } from "@/app/service/AxiosAuthService";
import ForumThreadCard from "./ForumThreadCard";
import { ForumThreadWithoutPosts } from "@/app/types/types";
import { PostCreationButton } from "./PostCreationButton";

export async function ThreadsContainer() {
  const forumThreadsResponse = await getForumThreads();
  const { data: forumThreads } = forumThreadsResponse;
  const lastReplied = "3 hours ago";
  const openedBy = "User 1";
  const openedTime = "1 day ago";

  return (
    <div>
      <PostCreationButton />
      {forumThreads.map((thread: ForumThreadWithoutPosts) => (
        <ForumThreadCard
          key={thread.id}
          threadId={thread.id}
          title={thread.title}
          lastReplied={lastReplied}
          openedBy={openedBy}
          openedTime={openedTime}
        />
      ))}
    </div>
  );
}
