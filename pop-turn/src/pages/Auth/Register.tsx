import { AuthPageTemplate } from "@/components/AuthPageTemplate";
import { createUser } from "@/firebase/auth";

export default function Home() {
  return (
    <div className="h-screen bg-orange-100 flex items-center justify-center">
      <AuthPageTemplate
        type="register"
        authFunction={createUser}
        key="register"
      />
    </div>
  );
}
