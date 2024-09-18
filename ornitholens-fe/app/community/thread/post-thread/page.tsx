"use client"; // TODO seperate to server as much as possible
import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { postForumThread } from "@/app/service/AxiosAuthService";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";

const PostThreadPage: React.FC = () => {
  const [threadTitle, setThreadTitle] = useState("");
  const [threadContent, setThreadContent] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const { token } = useAuth();
  const router = useRouter();

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setThreadTitle(event.target.value);
  };

  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setThreadContent(event.target.value);
  };

  const handleClick = async () => {
    if (isPosting) return;

    setIsPosting(true); // Disable the button to prevent multiple requests
    try {
      const response = await postForumThread(token, threadTitle, threadContent);
      router.push(`/community/thread/${response.data.id}`);
      router.refresh();
    } catch (error) {
      console.error("Error while trying to create the thread: " + error);
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        maxWidth: "80%",
        margin: "0 auto",
        mt: 4, // Add margin at the top
      }}
    >
      <Typography variant="h4" sx={{ mb: 2 }}>
        Create a New Thread
      </Typography>
      <TextField
        fullWidth
        id="outlined-basic"
        label="Title"
        variant="outlined"
        value={threadTitle}
        onChange={handleTitleChange}
        sx={{ mb: 2, bgcolor: "white" }} // Add margin at the bottom
      />
      <TextField
        id="outlined-multiline-static"
        label="Content"
        multiline
        minRows={4}
        value={threadContent}
        onChange={handleContentChange}
        variant="outlined"
        fullWidth
        sx={{ mb: 2, bgcolor: "white" }} // Add margin at the bottom
      />
      <Button
        variant="contained"
        onClick={handleClick}
        disabled={isPosting}
        sx={{ alignSelf: "flex-end" }}
      >
        {isPosting ? "Posting..." : "Post"}
      </Button>
    </Box>
  );
};

export default PostThreadPage;
