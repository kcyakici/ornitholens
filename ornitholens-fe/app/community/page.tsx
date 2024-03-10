"use server";
import React from "react";
import ForumThreadCard from "../components/ForumThreadCard";

const CommunityPage: React.FC = () => {
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
      <div>
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
    </div>
  );
};

export default CommunityPage;
