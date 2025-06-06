"use client";

import LoginForm from "@/app/login/components/form-login";

import { Flex } from "antd";

import styles from "./login.module.css";

export default function Login() {
  return (
    <Flex
      justify="space-evenly"
      align="center"
      className={styles.loginContainer}
    >
      <LoginForm />

      <Flex
        vertical
        justify="center"
        align="center"
        className={styles.loginDescription}
      >
        <img className={styles.logo} src="/logo.png" alt="logotipo" />
        <h2>Fiscaliza-e</h2>
        <p className={styles.loginParagraph}>
          Conecte-se com o Fiscaliza-e. Aqui, suas reclamações encontram
          respostas para um serviço público melhor.
        </p>
      </Flex>
    </Flex>
  );
}
