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

  const handleSignIn = () => {
    router.push("/login");
  };

  return authenticated ? (
    <div className={styles.authenticatedUserActions}>
      <button
        className={[
          styles.myComplaintsButton,
          styles.hoverButton,
          styles.defaultButton,
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
      <button
        className={[
          styles.signInButton,
          styles.hoverButton,
          styles.defaultButton,
        ].join(" ")}
        onClick={handleSignIn}
      >
        Entrar
      </button>
      <button
        className={[
          styles.signUpButton,
          styles.hoverButton,
          styles.defaultButton,
        ].join(" ")}
        onClick={onClick}
      >
        Cadastrar
      </button>
    </div>
  );
}
