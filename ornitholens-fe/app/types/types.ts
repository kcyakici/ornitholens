export type ForumPost = {
  content: string;
  time: string;
};

export type ForumThreadWithoutPosts = {
  title: string;
  time: string;
};

export type ForumThread = {
  forumPostList: ForumPost[];
  title: string;
  time: string;
};
