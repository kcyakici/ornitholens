"use client";

import { useAuth } from "@/app/context/AuthContext";
import { ThreadsContainer } from "./ThreadsContainer";
import Link from "next/link";
import { Button } from "@mui/material";

export function PostCreationButton() {
  const { isContextLoggedIn } = useAuth();

  return (
    <div>
      {isContextLoggedIn ? (
        <div>
          <Link href={`/community/thread/post-thread`} passHref>
            <Button>Post thread</Button>
          </Link>
        </div>
      ) : null}
    </div>
  );
}
