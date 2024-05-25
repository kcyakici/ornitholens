"use client";

import { useAuth } from "@/app/context/AuthContext";
import { User } from "@/app/types/types";
import { useEffect, useState } from "react";

export default function UserInfoBox() {
  const [userInfo, setUserInfo] = useState<User>();
  const { token } = useAuth();

  useEffect(() => {
    async function fetchData() {
      if (!token) return;

      const response = await fetch("http://localhost:8080/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data: User = await response.json();
        setUserInfo(data);
      }
    }
    fetchData();
  }, [token]);

  return (
    <>
      {userInfo ? (
        <div>
          <div>
            <strong>Username:</strong> {userInfo.name}
          </div>
          <div>
            <strong>Email:</strong> {userInfo.email}
          </div>
          <div>
            <strong>Rank:</strong> {userInfo.rank}
          </div>
          <div>
            <strong>Score:</strong> {userInfo.score}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
