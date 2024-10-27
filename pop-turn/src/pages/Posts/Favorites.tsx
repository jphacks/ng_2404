import { PostPageTemplate } from "@/components/PostPageTemplate";
import { Sidebar } from "@/components/sidebar";

export default function Home() {
  return (
    <div className="h-screen bg-white flex items-center justify-content-space-between">
      <Sidebar currentPage="Favorites" />
      <div className="w-[calc(100%-13rem)] ml-[13rem] h-full px-2 mt-10">
      <PostPageTemplate type="Favorites" />
      </div>
    </div>
  );
}
