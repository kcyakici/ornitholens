import ForumMessageBox from "@/app/components/forum/ForumMessageBox";
import UserPost from "@/app/components/forum/UserPost";
import UserPostWrapper from "@/app/components/forum/UserPostWrapper";
import { useAuth } from "@/app/context/AuthContext";
import { getForumThread } from "@/app/service/AxiosAuthService";
import { Typography } from "@mui/material";

export default async function Page({ params }: { params: { slug: string } }) {
  const id = params.slug;
  console.log(id);
  const forumThreadResponse = await getForumThread(id);
  if (!forumThreadResponse) {
    return <h1>Loading...</h1>;
  }

  const forumThreadData = forumThreadResponse!.data;

  return (
    <div>
      <Typography sx={{ textAlign: "center" }} variant="h3" gutterBottom>
        {forumThreadData.title}
      </Typography>
      <UserPostWrapper forumPostList={forumThreadData.forumPostList} />
      <ForumMessageBox threadId={id} />
    </div>
  );
}
//   //   const [threads, setThreads] = useState([]);

//   //   useEffect(() => {
//   //     fetchData();
//   //   }, []);

//   //   const fetchData = async () => {
//   //     try {
//   //       const response = await axios.get("/api/threads");
//   //       setThreads(response.data);
//   //     } catch (error) {
//   //       console.error("Error fetching data:", error);
//   //     }
//   //   };
