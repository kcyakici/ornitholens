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

export type Bird = {
  id: number;
  name: string;
  time: string;
  path: string;
};

export type GameImageAndAnswers = {
  imageUrl: string;
  correctAnswer: string;
  answers: string[];
};

export type UserScore = {
  score: number;
};
