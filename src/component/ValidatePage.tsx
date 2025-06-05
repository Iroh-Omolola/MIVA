import { useEffect } from "react";
import { useRouter } from "next/navigation";

const validatePage = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  return (props: P) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem("miva-token");
      if (!token) {
        router.push("/auth/login");
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };
};

export default validatePage;
