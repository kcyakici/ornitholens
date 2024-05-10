"use client";

import { useAuth } from "@/app/context/AuthContext";
import Link from "next/link";
import { Button } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export function PostCreationButton() {
  const { isContextLoggedIn } = useAuth();

  return (
    <div>
      {isContextLoggedIn ? (
        <div>
          <Link href={`/community/thread/post-thread`} passHref>
            <Button endIcon={<AddCircleOutlineIcon />}>Post thread</Button>
          </Link>
        </div>
      ) : null}
    </div>
  );
}
