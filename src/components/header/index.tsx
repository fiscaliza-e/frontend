import { useState } from "react";
import { useRouter } from "next/navigation";

import HeaderAuthenticationManager from "../header-authentication-manager";

import styles from "./header.module.css";

export default function Header() {
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter()


  const handleAuthentication = () => {
    setAuthenticated((authenticated) => !authenticated);
  };

  const handleGetHome = () => {
    router.push("/");
  };

  return (
    <header className={styles.headerContainer}>
      <h1 className={styles.Logo} onClick={handleGetHome}>
        FISCALIZA-e
      </h1>
      <HeaderAuthenticationManager
        authenticated={authenticated}
        onClick={handleAuthentication}
      />
    </header>
  );
}
