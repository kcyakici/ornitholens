export type ForumPost = {
  forumMember: string;
  content: string;
  time: string;
  id: string;
};

export type ForumThreadWithoutPosts = {
  id: string;
  title: string;
  time: string;
};

export type ForumThread = {
  forumPostList: ForumPost[];
  id: string;
  title: string;
  time: string;
};
