import { PostPageTemplate } from "@/components/PostPageTemplate";
import { Sidebar } from "@/components/sidebar";
import withAuth from "@/firebase/withAuth";
function Home() {
  return (
    <div className="h-screen bg-white flex items-center justify-content-space-between">
      <Sidebar currentPage="MyPosts" />
      <div className="w-[calc(100%-13rem)] ml-[13rem] h-full px-20 mt-10">
        <PostPageTemplate type="MyPosts" />
      </div>
    </div>
  );
}

export default withAuth(Home);
