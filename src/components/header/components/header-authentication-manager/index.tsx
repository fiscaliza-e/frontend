"use client";

import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { Button, Flex, Dropdown, MenuProps } from "antd";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";

interface Props {
  authenticated: boolean;
}

export default function HeaderAuthenticationManager({
  authenticated
}: Props) {
  const router = useRouter();
  const { logout } = useAuth();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogin = () => {
    router.push("/login");
  };

  const handleRegister = () => {
    router.push("/register");
  };

  const handleNavigateToMyComplaints = () => {
    router.push("/user/complaints");
  };

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  const handleProfile = () => {
    router.push("/profile");
  };

  if (!isClient) {
    return null;
  }

  if (!authenticated) {
    return (
      <Flex
        justify="space-evenly"
        align="center"
        className={styles.headerActionsContainer}
      >
        <a className={styles.loginText} onClick={handleLogin}>
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

  const items: MenuProps["items"] = [
    {
      key: "profile",
      label: "Perfil",
      onClick: handleProfile,
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      label: "Sair",
      danger: true,
      icon: <LogoutOutlined />,
      onClick: handleLogout,
    },
  ];

  return (
    <Flex
      className={styles.authenticatedUserActions}
      justify="space-around"
      align="center"
    >
      <Button
        className={styles.myComplaintsButton}
        onClick={handleNavigateToMyComplaints}
        type="primary"
      >
        Ver minhas solicitações
      </Button>
      <Dropdown menu={{ items }} trigger={["click"]} placement="bottomRight">
        <Flex
          className={classNames(
            styles.userIconButton,
            styles.hoverButton
          )}
          style={{ cursor: "pointer" }}
        >
          <UserOutlined className={styles.userIcon} />
        </Flex>
      </Dropdown>
    </Flex>
  );
}
