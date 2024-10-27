import { PostPageTemplate } from "@/components/PostPageTemplate";
import { Sidebar } from "@/components/sidebar";

export default function Home() {
  return (
    <div className="h-screen bg-white flex items-center justify-content-space-between">
      <Sidebar currentPage="Posts" />
      <div className="w-[calc(100%-13rem)] ml-[13rem] h-full px-20 mt-10">
        <PostPageTemplate type="Posts" />
      </div>
    </div>
  );
}
