import { PostPageTemplate } from "@/components/PostPageTemplate";
import { Sidebar } from "@/components/sidebar";

export default function Home() {
  return (
    <div className="h-screen bg-white flex items-center justify-content-space-between">
      <Sidebar currentPage="MyPosts" />
      <div className="w-[85vw] ml-[15vw] h-full px-24 mt-10">
        <PostPageTemplate type="MyPosts" />
      </div>
    </div>
  );
}
