"use client";
import { useAuth } from "@/app/context/AuthContext";
import { postForumPost } from "@/app/service/AxiosAuthService";
import { Button, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

type ForumMessageBoxProps = {
  threadId: string;
};

export default function ForumMessageBox({
  threadId,
}: ForumMessageBoxProps): JSX.Element {
  const [messageContent, setMessageContent] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const { token, isContextLoggedIn } = useAuth();
  const router = useRouter();

  const handleMessageContentChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMessageContent(event.target.value);
  };

  const handleClick = async () => {
    if (isPosting) return;

    setIsPosting(true); // Disable the button to prevent multiple requests
    try {
      console.log("You are here");
      const response = await postForumPost(token, threadId, messageContent);
      console.log(response); // TODO remove
      router.push(`/community/thread/${threadId}`);
    } catch (error) {
      console.error("Error while trying to create the post: " + error);
    } finally {
      setIsPosting(false);
    }
  };

  return isContextLoggedIn ? (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <TextField
        id="outlined-multiline-static"
        label="Multiline"
        multiline
        minRows={4}
        value={messageContent}
        onChange={handleMessageContentChange}
      />
      <Button
        sx={{ alignSelf: "flex-end" }}
        onClick={handleClick}
        disabled={isPosting}
      >
        {isPosting ? "Posting..." : "Post"}
      </Button>
    </div>
  ) : (
    <></>
  );
}
