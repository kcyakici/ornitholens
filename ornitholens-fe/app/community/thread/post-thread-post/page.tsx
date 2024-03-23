"use client";
import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { postForumThread } from "@/app/service/AxiosAuthService";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";

type PostThreadPostPageProps = {
  threadId: string;
};

function PostThreadPostPage({ threadId }: PostThreadPostPageProps) {
  const [threadContent, setThreadContent] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const { token } = useAuth();
  const router = useRouter();

  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setThreadContent(event.target.value);
  };

  const handleClick = async () => {
    if (isPosting) return;

    setIsPosting(true); // Disable the button to prevent multiple requests
    try {
      console.log("You are here");
      const response = await postForumThread(token, threadId, threadContent);
      console.log(response); // TODO remove
      router.push(`/community/thread/${response.data.id}`);
    } catch (error) {
      console.error("Error while trying to created a thread: " + error);
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          maxWidth: "70%",
        }}
      >
        <TextField
          id="outlined-multiline-static"
          label="Multiline"
          multiline
          minRows={4}
          value={threadContent}
          onChange={handleContentChange}
        />
        <Button
          sx={{ alignSelf: "flex-end" }}
          onClick={handleClick}
          disabled={isPosting}
        >
          {isPosting ? "Posting..." : "Post"}
        </Button>
      </Box>
    </div>
  );
}

export default PostThreadPostPage;
