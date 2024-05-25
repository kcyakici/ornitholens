"use client";
import { useEffect, useState } from "react";
import BirdCard from "./BirdCard";
import { Bird } from "@/app/types/types";
import { getAlbumImages } from "@/app/service/AxiosAuthService";
import { useAuth } from "@/app/context/AuthContext";
import { parseDateForum } from "@/app/utils/DateUtils";

export default function BirdCardWrapper() {
  const { token } = useAuth();
  const [birds, setBirds] = useState<Bird[]>();

  useEffect(() => {
    async function fetchData() {
      if (!token) return;
      const res = await getAlbumImages(token);
      if (res) {
        const resData = res?.data;
        const resDataCopy = resData.map((bird) => ({
          ...bird,
          path: `http://localhost:8080${bird.path}`,
        }));
        console.log(resDataCopy);
        setBirds(resDataCopy);
      }
    }

    fetchData();
  }, [token]);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignContent: "flex-start",
        gap: "50px 50px",
        width: "60vw",
        margin: "auto",
      }}
    >
      {token && birds ? (
        birds.map((bird) => (
          <BirdCard
            key={bird.id}
            title={bird.name}
            date={bird.time}
            imageSrc={bird.path}
          />
        ))
      ) : (
        <></>
      )}
    </div>
  );
}
