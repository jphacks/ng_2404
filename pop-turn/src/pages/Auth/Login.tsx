import { AuthPageTemplate } from "@/components/AuthPageTemplate";
import { signIn } from "@/firebase/auth";

export default function Home() {
  return (
    <div className="h-screen bg-orange-100 flex items-center justify-center">
      <AuthPageTemplate authFunction={signIn} type="login" key="login" />
    </div>
  );
}
