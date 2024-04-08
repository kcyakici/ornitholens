export type ForumPost = {
  forumMember: ForumMember;
  content: string;
  time: string;
  id: string;
};

export type ForumThreadWithoutPosts = {
  id: string;
  title: string;
  time: string;
};

export type ForumMember = {
  id: string;
  name: string;
  email: string;
};

export type ForumThread = {
  forumPostList: ForumPost[];
  id: string;
  title: string;
  time: string;
};
