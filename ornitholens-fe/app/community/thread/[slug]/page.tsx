"use client";
import ForumMessageBox from "@/app/components/forum/ForumMessageBox";
import { useAuth } from "@/app/context/AuthContext";
import { getForumThreads } from "@/app/service/AxiosAuthService";

export default function Page({ params }: { params: { slug: string } }) {
  const { isContextLoggedIn } = useAuth();

  return (
    <div>
      My Post: {params.slug}
      {isContextLoggedIn ? <ForumMessageBox threadId={params.slug} /> : null}
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
