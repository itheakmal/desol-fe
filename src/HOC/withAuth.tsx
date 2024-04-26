import { useEffect } from "react";
import { useRouter } from "next/router";

const withAuth = (Component: React.ElementType) => {
  return function AuthenticatedComponent(props: any) {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/"); // Redirect to login if user is not logged in
      }
    }, [router]);

    return <Component {...props} />;
  };
};

export default withAuth;
