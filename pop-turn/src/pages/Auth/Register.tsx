import { AuthPageTemplate } from "@/components/AuthPageTemplate";

export default function Home() {
  return (
    <div className="h-screen bg-orange-100 flex items-center justify-center">
      <AuthPageTemplate type="register" />
    </div>
  );
}
