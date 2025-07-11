import styles from "./styles.module.css";
import { UserOutlined } from "@ant-design/icons";
import { Button, Flex } from "antd";
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

  const handleNavigateToMyComplaints = () => {
    router.push("/user/complaints");
  };

  return authenticated ? (
    <Flex className={styles.authenticatedUserActions} justify="space-around" align="center">
      <Button
        className={styles.myComplaintsButton}
        onClick={handleNavigateToMyComplaints}
        type="primary"
      >
        Ver minhas solicitações
      </Button>
      <Flex className={classNames(styles.userIconButton, styles.hoverButton)}>
        <UserOutlined className={styles.userIcon} />
      </Flex>
    </Flex>
  ) : (
    <Flex
      justify="space-evenly"
      align="center"
      className={styles.headerActionsContainer}
    >
      <a
        className={styles.loginText}
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
