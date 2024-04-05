"use client";

import { useAuth } from "@/app/context/AuthContext";
import { extractJwtSubject } from "@/app/utils/JwtUtil";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Button } from "@mui/material";

export default function ForumPostButtons({
  postOwner,
  id,
}: {
  postOwner: string;
  id: string;
}): JSX.Element {
  const { isContextLoggedIn, token } = useAuth();

  return isContextLoggedIn && postOwner === extractJwtSubject(token) ? (
    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
      <Button>
        <EditIcon />
        Edit
      </Button>
      <Button>
        <DeleteIcon />
        Delete
      </Button>
    </Box>
  ) : (
    <></>
  );
}
