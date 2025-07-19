import { useRouter } from "next/navigation";

import HeaderAuthenticationManager from "./components/header-authentication-manager";

import styles from "./styles.module.css";
import { useAuth } from "@/hooks/use-auth";

export default function Header() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();


  const handleNavigateToHome = () => {
    router.push("/");
  };

  return (
    <header className={styles.headerContainer}>
      <h1 className={styles.logo} onClick={handleNavigateToHome}>
        FISCALIZA-e
      </h1>
      <HeaderAuthenticationManager
        authenticated={isAuthenticated}
      />
    </header>
  );
}
