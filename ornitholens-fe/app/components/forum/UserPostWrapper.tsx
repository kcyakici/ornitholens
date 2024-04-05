import { getForumThread } from "@/app/service/AxiosAuthService";
import UserPost from "./UserPost";
import { ForumPost } from "@/app/types/types";

export default async function UserPostWrapper({
  forumPostList,
}: {
  forumPostList: ForumPost[];
}) {
  return (
    <div>
      {forumPostList.map((forumPost) => (
        <UserPost
          key={forumPost.id}
          id={forumPost.id}
          username="Harcoded username"
          postedAt={forumPost.time}
          content={forumPost.content}
        />
      ))}
    </div>
  );
}
