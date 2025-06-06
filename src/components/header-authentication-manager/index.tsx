import styles from "./header-authentication-manager.module.css";
import { UserOutlined } from "@ant-design/icons";

import { useRouter } from "next/navigation";

interface Props {
  authenticated: boolean;
  onClick?: () => void;
}

export default function HeaderAuthenticationManager({
  authenticated,
  onClick,
}: Props) {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/login");
  };

  const handleRegister = () => {
    router.push("/register");
  };

  return authenticated ? (
    <div className={styles.authenticatedUserActions}>
      <button
        className={[
          styles.myComplaintsButton,
          styles.hoverElement,
          styles.defaultElement,
        ].join(" ")}
        onClick={onClick}
      >
        Ver minhas solicitações
      </button>
      <div className={[styles.userIconButton, styles.hoverButton].join(" ")}>
        <UserOutlined className={styles.userIcon} />
      </div>
    </div>
  ) : (
    <div className={styles.headerActionsContainer}>
      <a
        className={[
          styles.signIn,
          styles.hoverElement,
          styles.defaultElement,
        ].join(" ")}
        onClick={handleLogin}
      >
        Entrar
      </a>
      <a
        className={[
          styles.signUp,
          styles.hoverElement,
          styles.defaultElement,
        ].join(" ")}
        onClick={handleRegister}
      >
        Cadastrar
      </a>
    </div>
  );
}
