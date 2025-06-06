import styles from "./header-authentication-manager.module.css";
import { UserOutlined } from "@ant-design/icons";
import { Flex } from "antd";
import classNames from "classnames";

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
        className={classNames(
          styles.myComplaintsButton,
          styles.hoverElement,
          styles.defaultElement
        )}
        onClick={onClick}
      >
        Ver minhas solicitações
      </button>
      <div className={classNames(styles.userIconButton, styles.hoverButton)}>
        <UserOutlined className={styles.userIcon} />
      </div>
    </div>
  ) : (
    <Flex
      justify="space-evenly"
      align="center"
      className={styles.headerActionsContainer}
    >
      <a
        className={classNames(
          styles.loginText,
          styles.hoverElement,
          styles.defaultElement
        )}
        onClick={handleLogin}
      >
        Entrar
      </a>
      <a
        className={classNames(
          styles.registerText,
          styles.hoverElement,
          styles.defaultElement
        )}
        onClick={handleRegister}
      >
        Cadastrar
      </a>
    </Flex>
  );
}
