"use client";

import LoginForm from "@/components/form-login";

import styles from "./login.module.css";

export default function Login() {
  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginForm}>
        <h1>Entrar</h1>
        <LoginForm />
      </div>
      <div className={styles.loginDescription}>
          <img className={styles.logo} src="/logo.png" alt="logotipo" />
        <h2>Fiscaliza-e</h2>
        <p className={styles.loginParagraph}>
          Conecte-se com o Fiscaliza-e. Aqui, suas reclamações encontram
          respostas para um serviço público melhor.
        </p>
      </div>
    </div>
  );
}
