export default function Page({ params }: { params: { slug: string } }) {
  return <div>My Post: {params.slug}</div>;
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
