import ForumMessageBox from "@/app/components/forum/ForumMessageBox";
import UserPost from "@/app/components/forum/UserPost";
import UserPostWrapper from "@/app/components/forum/UserPostWrapper";
import { useAuth } from "@/app/context/AuthContext";
import { getForumThread } from "@/app/service/AxiosAuthService";

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
      <h1>{forumThreadData.title}</h1>
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
