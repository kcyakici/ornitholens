"use client";

import { useAuth } from "@/app/context/AuthContext";
import { deleteForumPost } from "@/app/service/AxiosAuthService";
import { extractJwtSubject } from "@/app/utils/JwtUtil";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import ConfirmationModal from "./ConfirmationModal";
import { useState } from "react";

export default function ForumPostButtons({
  postOwnerEmail,
  id,
}: {
  postOwnerEmail: string;
  id: string;
}): JSX.Element {
  const { isContextLoggedIn, token } = useAuth();
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  return isContextLoggedIn && postOwnerEmail === extractJwtSubject(token) ? (
    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
      <Button>
        <EditIcon />
        Edit
      </Button>
      <Button onClick={() => setIsConfirmationModalOpen(true)}>
        <DeleteIcon />
        Delete
      </Button>
      <ConfirmationModal
        id={id}
        open={isConfirmationModalOpen}
        handleClose={() => setIsConfirmationModalOpen(false)}
      />
    </Box>
  ) : (
    <></>
  );
}
