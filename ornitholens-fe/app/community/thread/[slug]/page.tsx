import ForumMessageBox from "@/app/components/forum/ForumMessageBox";
import UserPost from "@/app/components/forum/UserPost";
import UserPostWrapper from "@/app/components/forum/UserPostWrapper";
import { useAuth } from "@/app/context/AuthContext";
import { getForumThread } from "@/app/service/AxiosAuthService";

export default async function Page({ params }: { params: { slug: string } }) {
  const id = params.slug;
  console.log(id);
  const forumThread = await getForumThread({ id });
  const { data } = forumThread;
  return (
    <div>
      <h1>{data.title}</h1>
      <UserPostWrapper forumPostList={data.forumPostList} />
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
