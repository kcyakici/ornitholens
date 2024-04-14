import { GameImageAndAnswers } from "@/app/types/types";

export async function GET(request: Request) {
  const res = await fetch("http://localhost:8080/identify");
  const data: GameImageAndAnswers = await res.json();

  return Response.json({ data });
}
