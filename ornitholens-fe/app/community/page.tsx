import React from "react";
import { ThreadsContainer } from "../components/forum/ThreadsContainer";
import { Typography } from "@mui/material";

async function CommunityPage() {
  return (
    <div>
      <Typography variant="h3" className="text-center">
        Welcome to OrnithoLens community!
      </Typography>
      <ThreadsContainer />
    </div>
  );
}

export default CommunityPage;
