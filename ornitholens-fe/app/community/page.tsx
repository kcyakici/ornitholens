"use server";
import React from "react";
import ForumThreadCard from "../components/ForumThreadCard"; // Assuming you have ForumThreadCard component

const CommunityPage: React.FC = () => {
  const handleClick = (id: number) => {};
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
        {/* Render ForumThreadCards for each thread */}
        {forumThreads.map((thread) => (
          <ForumThreadCard
            key={thread.id}
            id={thread.id}
            title={thread.title}
            lastReplied={thread.lastReplied}
            openedBy={thread.openedBy}
            openedTime={thread.openedTime}
            handleClick={() => handleClick(thread.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default CommunityPage;

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const CommunityPage: React.FC = () => {
//   //   const [threads, setThreads] = useState([]);

//   //   useEffect(() => {
//   //     fetchData();
//   //   }, []);

//   //   const fetchData = async () => {
//   //     try {
//   //       const response = await axios.get("/api/threads");
//   //       setThreads(response.data);
//   //     } catch (error) {
//   //       console.error("Error fetching data:", error);
//   //     }
//   //   };

//   return <div>You are in Community</div>;
// };

// export default CommunityPage;
