import { useRouter } from "next/router";
import { useEffect } from "react";

const validatePage = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const Wrapper = (props: P) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem("miva-token");
      if (!token) {
        router.push("/auth/login");
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  // Add a display name for better debugging
  Wrapper.displayName = `validatePage(${WrappedComponent.displayName || WrappedComponent.name || "Component"})`;

  return Wrapper;
};

export default validatePage;
