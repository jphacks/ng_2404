import { AuthPageTemplate } from "@/components/AuthPageTemplate";

export default function Home() {
  return (
    <div className="h-full w-hull bg-orange-100">
      <AuthPageTemplate type="register" />
    </div>
  );
}
