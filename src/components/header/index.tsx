import { useState } from "react";
import { useRouter } from "next/navigation";

import HeaderAuthenticationManager from "./components/header-authentication-manager";

import styles from "./styles.module.css";

export default function Header() {
  const [authenticated, setAuthenticated] = useState(true);
  const router = useRouter();

  const handleAuthentication = () => {
    setAuthenticated((authenticated) => !authenticated);
  };

  const handleNavigateToHome = () => {
    router.push("/");
  };

  return (
    <header className={styles.headerContainer}>
      <h1 className={styles.logo} onClick={handleNavigateToHome}>
        FISCALIZA-e
      </h1>
      <HeaderAuthenticationManager
        authenticated={true}
        onClick={handleAuthentication}
      />
    </header>
  );
}
