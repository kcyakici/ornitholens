"use client";
import React from "react";
import ForumThreadCard from "../components/forum/ForumThreadCard";
import { Button } from "@mui/material";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { getForumThreads } from "../service/AxiosAuthService";

const CommunityPage: React.FC = () => {
  const { isContextLoggedIn } = useAuth();
  const forumThreadsFromBackend = getForumThreads(); // TODO change name
  console.log(forumThreadsFromBackend);

  // Mock data for forum threads
  const forumThreads = [
    {
      id: 1,
      title: "Thread 1",
      lastReplied: "3 hours ago",
      openedBy: "User 1",
      openedTime: "1 day ago",
    },
    {
      id: 2,
      title: "Thread 2",
      lastReplied: "1 day ago",
      openedBy: "User 2",
      openedTime: "2 days ago",
    },
    {
      id: 3,
      title: "Thread 3",
      lastReplied: "2 days ago",
      openedBy: "User 3",
      openedTime: "3 days ago",
    },
  ];

  return (
    <div>
      <h1>Community Page</h1>
      {isContextLoggedIn ? (
        <div>
          <Link href={`/community/thread/post-thread`} passHref>
            <Button>Post thread</Button>
          </Link>
        </div>
      ) : (
        <div></div>
      )}
      {forumThreads.map((thread) => (
        <ForumThreadCard
          key={thread.id}
          threadId={thread.id}
          title={thread.title}
          lastReplied={thread.lastReplied}
          openedBy={thread.openedBy}
          openedTime={thread.openedTime}
        />
      ))}
    </div>
  );
};

export default CommunityPage;
