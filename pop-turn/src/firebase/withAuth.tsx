// withAuth.tsx
import { useEffect, ComponentType } from "react";
import { useRouter } from "next/router";
import { auth } from "./config";
import { onAuthStateChanged } from "firebase/auth";

// プロップスの型を定義
type WithAuthProps = {};

// HOCの型定義
function withAuth<T extends WithAuthProps>(WrappedComponent: ComponentType<T>) {
  const WithAuthComponent: React.FC<T> = (props) => {
    const router = useRouter();

    useEffect(() => {
      // Firebaseの認証状態を監視
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (!user) {
          // ログインしていない場合はログインページにリダイレクト
          router.replace("/");
        }
      });

      return () => unsubscribe();
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  return WithAuthComponent;
}

export default withAuth;
